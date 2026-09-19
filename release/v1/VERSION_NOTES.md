# Version notes — v1.0.0

## Package identity

- Product: NiraiNuval NSDXN parser
- Version: v1.0.0
- Target: Windows x64
- Implementation: Aingnyazhi
- Package type: self-contained executable distribution

## Included files

| File | Purpose |
|---|---|
| `nsdxn-v1-windows-x64.exe` | Parser executable |
| `NiraiNuval_NSDXN_v4.md` | NSDXN specification |
| `LICENSE` | MIT license |
| `README.md` | Package usage and deployment entry point |

## Scope

This package supports the currently defined single-file parser workflow on
Windows x64. It does not include the compiler, source repository, build cache,
test evidence, editor extension, or PowerShell wrapper.

The v1.0.0 version is used for deployment tracking. It does not claim complete
language conformance, production readiness, or a stable library ABI.

## Usage

From the package directory, provide an NSDXN input document through the
`NSDXN_INPUT` environment variable:

```powershell
$env:NSDXN_INPUT = (Resolve-Path ./document.nsdxn).Path
./nsdxn-v1-windows-x64.exe
```

## Integrity

- Executable SHA-256: `C531F4B0EC2A87A583AE97FC0E453643A0864C29E7BF18285871CAF6824E12FB`
- Specification SHA-256: `BAD2602AFB630BBCC6E1DD69F1CE75A9BD9F45B6812CAFE5607F9546F2631182`
- License SHA-256: `DFB78F1A178D8A11101E9499746A24DB34CC094A022A0BC02FD52492531952EA`

The executable reads its input from `NSDXN_INPUT`. A wrapper script is not
included in this cleaned package.
