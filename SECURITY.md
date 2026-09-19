# Security policy

## Supported versions

Only the latest experimental release is supported. Older release directories
are retained as immutable evidence and are not patched.

NiraiNuval is currently a Windows-only experimental parser process. Do not use
it with untrusted data in a security-sensitive service until the project's
memory-safety and clean-host readiness requirements have been verified.

## Reporting a vulnerability

Do not open a public issue for a suspected security vulnerability. Report it
privately to the repository maintainer through the configured source-hosting
security channel.

Include, where possible:

- the affected version and SHA-256 hash;
- operating system and toolchain details;
- a minimal reproducer;
- expected and observed behavior; and
- whether the issue causes a crash, hang, resource exhaustion, data exposure,
  or incorrect parsing.

If a private security channel is unavailable, contact the maintainer before
publishing technical details. Reports are acknowledged when received and may
be documented in release notes after safe disclosure.

## Current limitations

- The parser is experimental and does not claim memory safety.
- Current fuzzing covers deterministic process, timeout, and exit behavior;
  it is not a substitute for sanitizer coverage of the Aingnyazhi runtime.
- The supported wrapper bounds process time through the structured API.
- The direct executable remains an internal single-file interface.
