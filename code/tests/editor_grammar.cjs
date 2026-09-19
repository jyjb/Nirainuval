const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const [extensionRoot, modulesRoot] = process.argv.slice(2);
const tm = require(path.join(modulesRoot, 'vscode-textmate'));
const onig = require(path.join(modulesRoot, 'vscode-oniguruma'));

(async () => {
  const wasmPath = [modulesRoot + '.unpacked', modulesRoot]
    .map(root => path.join(root, 'vscode-oniguruma/release/onig.wasm'))
    .find(candidate => fs.existsSync(candidate));
  assert.ok(wasmPath, 'VS Code Oniguruma WASM was not found');
  const wasm = fs.readFileSync(wasmPath);
  await onig.loadWASM(wasm.buffer.slice(wasm.byteOffset, wasm.byteOffset + wasm.byteLength));
  const manifest = JSON.parse(fs.readFileSync(path.join(extensionRoot, 'package.json'), 'utf8'));
  // VS Code rewrites package.json to append installation metadata.
  const effectiveManifest = { ...manifest };
  delete effectiveManifest.__metadata;
  assert.deepEqual(effectiveManifest, JSON.parse(fs.readFileSync(path.join(__dirname, '../vscode/package.json'), 'utf8')));
  assert.deepEqual(manifest.contributes.languages[0].extensions, ['.nsdxn', '.நு', '.நுவல்']);
  assert.equal(manifest.main, undefined);
  assert.equal(manifest.browser, undefined);
  for (const entry of [...manifest.contributes.grammars, ...manifest.contributes.snippets]) {
    JSON.parse(fs.readFileSync(path.join(extensionRoot, entry.path), 'utf8'));
  }
  JSON.parse(fs.readFileSync(path.join(extensionRoot, manifest.contributes.languages[0].configuration), 'utf8'));
  const registry = new tm.Registry({
    onigLib: Promise.resolve({ createOnigScanner: s => new onig.OnigScanner(s), createOnigString: s => new onig.OnigString(s) }),
    loadGrammar: async () => tm.parseRawGrammar(fs.readFileSync(path.join(extensionRoot, manifest.contributes.grammars[0].path), 'utf8'), 'nsdxn.json')
  });
  const grammar = await registry.loadGrammar('source.nsdxn');
  let checks = 0;
  function check(lines, lineIndex, needle, scope, present = true) {
    let state = tm.INITIAL;
    let result;
    for (let i = 0; i <= lineIndex; ++i) {
      result = grammar.tokenizeLine(lines[i], state);
      state = result.ruleStack;
      assert.equal(result.stoppedEarly, false);
    }
    const offset = lines[lineIndex].indexOf(needle);
    assert.ok(offset >= 0);
    const token = result.tokens.find(t => t.startIndex <= offset && t.endIndex > offset);
    assert.equal(token.scopes.includes(scope), present, `${lines[lineIndex]} / ${needle}: ${token.scopes}`);
    checks++;
  }
  check(['  ~ comment'], 0, '~', 'comment.line.tilde.nsdxn');
  check(['/name=hello~world'], 0, '~', 'comment.line.tilde.nsdxn', false);
  check(['/பெயர்=<கனி>'], 0, 'பெயர்', 'variable.other.member.nsdxn');
  check(['/name=<true+{x}>'], 0, 'true', 'string.quoted.other.nsdxn');
  check(['/name=<true+{x}>'], 0, '{', 'meta.expression.nsdxn', false);
  check(['/name=<a|>b>+age=2'], 0, 'b', 'string.quoted.other.nsdxn');
  check(['/name=<a|>b>+age=2'], 0, 'age', 'variable.other.member.nsdxn');
  check(['/raw=<|', '~ not a comment', 'x||>y', '|>', '/age=2'], 1, '~', 'string.quoted.other.raw.nsdxn');
  check(['/raw=<|', '~ not a comment', 'x||>y', '|>', '/age=2'], 2, 'y', 'string.quoted.other.raw.nsdxn');
  check(['/raw=<|', '~ not a comment', 'x||>y', '|>', '/age=2'], 4, 'age', 'variable.other.member.nsdxn');
  check(['/name=a||b'], 0, '||', 'constant.character.escape.nsdxn');
  check(['/name={a||{b&&c}}'], 0, '||', 'keyword.operator.logical.nsdxn');
  check(['/name={a||{b&&c}}'], 0, '&&', 'keyword.operator.logical.nsdxn');
  check(['/name={a||<b&&c>}'], 0, '&&', 'keyword.operator.logical.nsdxn', false);
  check(['/code=007'], 0, '007', 'constant.numeric.nsdxn', false);
  check(['/flag=true'], 0, 'true', 'constant.language.nsdxn');
  check(['/age=29'], 0, '29', 'constant.numeric.nsdxn');
  check(['Users#id(number)+name(text)'], 0, '(number)', 'storage.type.nsdxn');
  // Exercise real documents, including malformed inputs, without pretending to validate them.
  let documents = 0;
  for (const folder of ['fixtures', 'contracts/tables']) {
    for (const name of fs.readdirSync(path.join(__dirname, folder)).filter(n => n.endsWith('.nsdxn'))) {
      let state = tm.INITIAL;
      for (const line of fs.readFileSync(path.join(__dirname, folder, name), 'utf8').split(/\r?\n/)) {
        const result = grammar.tokenizeLine(line, state);
        assert.equal(result.stoppedEarly, false);
        state = result.ruleStack;
      }
      documents++;
    }
  }
  registry.dispose();
  console.log(JSON.stringify({ passed: true, assertions: checks, corpusDocuments: documents, node: process.versions.node }));
})().catch(error => { console.error(error); process.exitCode = 1; });
