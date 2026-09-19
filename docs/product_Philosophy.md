# Product Philosophy

NiraiNuval is a compact, deterministic semantic data-exchange notation for
humans, software, and AI systems.

## Principles

The product prioritizes:

- clear, inspectable data;
- deterministic parsing and serialization;
- stable and useful diagnostics;
- a small implementation surface;
- explicit semantics over accidental behavior; and
- documentation that separates supported behavior from future work.

## Design direction

NiraiNuval should be easy to read, validate, reproduce, and exchange. The
format is intended to preserve meaning across human and machine workflows
without depending on hidden state or implementation-specific behavior.

The project favors predictable behavior over feature volume. New language
features should have a clear semantic purpose, a testable contract, and
documentation that explains their supported scope.

## Implementation boundary

The parser implementation is written in Aingnyazhi. Supporting scripts,
fixtures, editor metadata, and release artifacts may assist development and
distribution, but they do not define parser behavior.

## Current scope

The implementation is experimental and does not yet cover the entire language
specification. Release notes and specifications describe the behavior that is
currently supported. Future work must not be presented as production-ready
functionality until it has corresponding implementation, tests, and
documentation.
