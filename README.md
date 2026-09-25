# NiraiNuval

**NiraiNuval (நிறைநுவல்)** is a **Semantic Data eXchange Notation (NSDXN)** for compact, deterministic data exchange between people, software, and AI systems.

NiraiNuval is designed around a simple premise:

> Data exchanged between humans, applications, agents, and language models should preserve meaning without requiring unnecessary structural repetition.

It provides a notation in which data can remain concise and human-readable while retaining an explicit, deterministic structure that software can parse and validate.

---

## Why NiraiNuval?

Most data interchange formats were designed primarily for software-to-software communication.

Modern systems increasingly exchange information across a broader set of participants:

**People ↔ Software ↔ AI systems**

This introduces different requirements.

A useful exchange notation for these environments should be:

* **Compact** — avoid unnecessary structural repetition.
* **Deterministic** — the same input should produce the same interpretation.
* **Semantic** — structure should communicate relationships and meaning, not merely delimit values.
* **Human-readable** — documents should remain understandable without specialized tooling.
* **Machine-readable** — software should be able to parse and validate the notation reliably.
* **AI-friendly** — structured context should be expressible without excessive syntactic overhead.

NiraiNuval explores this design space.

---

## Design Philosophy

NiraiNuval is not intended to be another syntax for representing JSON.

Its design begins with the semantics of the information being represented and then attempts to express that information with the minimum structure necessary to preserve its meaning.

The notation therefore prioritizes:

**Meaning over ceremony.**

**Determinism over inference.**

**Compactness without ambiguity.**

**Human and machine readability together.**

The goal is not simply to reduce character count. Compactness is useful only when the resulting representation continues to communicate its structure reliably.

For the complete design principles, priorities, and boundaries, see [Product Philosophy](docs/product_Philosophy.md).

---

## Example

A NiraiNuval document can express structured information without repeatedly restating its surrounding structure.

```text
base=all
/group=hotmail
//id=<Some wide open Text>+name=findjeyraj@hotmail.com+tag=[github,gitlab]
//id=<Some wide open Text>+name=jeyraj.jeyraj@hotmail.com+tag=[mail]
```

Here, the notation communicates hierarchy, identity, attributes, and collections through a compact structural vocabulary.

The objective is not merely shorter serialization. The structure must remain deterministic enough for a parser to reconstruct the intended semantic model without guessing.

---

## Core Characteristics

NiraiNuval is being designed around several fundamental properties:

| Property                   | Intent                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------ |
| **Semantic structure**     | Represent relationships and meaning directly in the notation.                        |
| **Deterministic parsing**  | Valid input has a defined interpretation rather than relying on heuristic inference. |
| **Compact representation** | Reduce redundant syntax and repeated structural information.                         |
| **Human readability**      | Keep documents understandable when read directly.                                    |
| **Machine readability**    | Support reliable parsing, validation, and transformation.                            |
| **AI-oriented exchange**   | Provide structured information to AI systems with lower representational overhead.   |

These properties are design constraints rather than independent features. A reduction in syntax, for example, must not introduce semantic ambiguity.

---

## NSDXN

**NSDXN** stands for:

**NiraiNuval Semantic Data eXchange Notation**

NSDXN refers to the notation and its associated semantic rules.

NiraiNuval is the project and implementation built around that notation.

---

## Project Status

NiraiNuval is currently **experimental software**.

The current implementation supports a defined subset of NSDXN and should not be treated as a complete or stable implementation of the language.

Syntax, semantic rules, tooling, packaging, and specifications may change as the notation develops.

The repository should therefore currently be treated as a language and parser development project rather than a production interchange standard.

---

## Implementation

The NiraiNuval parser is implemented in **Aingnyazhi (`.azhi`)**.

The parser, semantic model, validation behavior, and language-level implementation belong in Aingnyazhi.

### Implementation Boundary

The parser architecture deliberately excludes alternative native implementations.

The following must **not** be introduced as implementations of NiraiNuval parser behavior:

* C parser implementations
* C source mirrors
* C bridges
* C validators
* C test harnesses
* bundled compiler implementations

Build orchestration may use PowerShell.

Test fixtures may use NSDXN itself.

The optional VS Code integration may contain declarative editor metadata.

These supporting components do not implement parser semantics.

The architectural boundary exists to ensure that NiraiNuval has one authoritative implementation rather than parallel implementations whose behavior can diverge.

---

## Repository Layout

| Path                           | Purpose                                           |
| ------------------------------ | ------------------------------------------------- |
| `code/src/nsdxn_v1.azhi`       | Aingnyazhi parser, semantic model, and self-tests |
| `code/tests/fixtures/`         | Parser fixtures                                   |
| `code/tests/contracts/tables/` | Table contract fixtures and expectations          |
| `code/vscode/`                 | Declarative VS Code language metadata             |
| `docs/`                        | Specifications, philosophy, and design records    |
| `release/v1/`                  | Deployable Windows x64 package                    |

---

## Usage

The current deployable v1 package is available under:

```text
release/v1/
```

To validate an NSDXN document using the packaged executable from the repository root:

```powershell
$env:NSDXN_INPUT = (Resolve-Path ./document.nsdxn).Path
./release/v1/nsdxn-v1-windows-x64.exe
```

The input document is supplied through the `NSDXN_INPUT` environment variable.

The current v1 executable targets **Windows x64** and is distributed as a self-contained experimental package.

---

## Determinism

Determinism is a fundamental requirement of NiraiNuval.

Compact notation must not require a parser to guess what the author intended.

Where multiple interpretations would otherwise be possible, the NSDXN specification must define the interpretation or reject the document.

This principle applies to:

* structural hierarchy,
* values,
* collections,
* identifiers,
* attributes,
* inheritance or contextual structure,
* validation,
* and semantic interpretation.

A shorter representation is not considered an improvement if achieving it introduces ambiguity.

---

## Human, Software, and AI Exchange

NiraiNuval is intended for environments where the same information may move through several kinds of consumers.

```text
Person
  ↕
NiraiNuval
  ↕
Software
  ↕
NiraiNuval
  ↕
AI / Agent
```

Rather than creating separate representations for human configuration, application interchange, and AI context, NiraiNuval investigates whether these environments can share a common deterministic semantic representation.

Potential use cases include configuration, structured application data, agent context, AI input/output contracts, compact API payloads, local data exchange, and machine-generated structured documents.

These are intended application areas, not claims that the current experimental implementation already supports every such workload.

---

## What NiraiNuval Is Not

NiraiNuval is not intended to be:

* a JSON compatibility layer,
* a YAML dialect,
* an indentation-based configuration syntax,
* a binary serialization format,
* a natural-language format that depends on AI interpretation,
* or a notation where compactness takes precedence over deterministic meaning.

Existing formats solve many interchange problems well.

NiraiNuval is exploring a different problem: **a compact semantic exchange notation designed from the outset for people, conventional software, and AI systems to consume.**

---

## Releases

The current v1 package contains the executable, specification, license, manifest, and version notes.

See [Version Notes](release/v1/VERSION_NOTES.md) for package identity, supported scope, and integrity information.

---

## Security

NiraiNuval is experimental and should be treated accordingly when processing externally supplied or untrusted documents.

See [SECURITY.md](SECURITY.md) before using NiraiNuval with untrusted input.

---

## License

NiraiNuval is released under the **MIT License**.

See [LICENSE](LICENSE) for the complete license terms.
