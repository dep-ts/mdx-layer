DENO = deno
RUN  = $(DENO) task
ARGS = 

# ------------------------------------------------------------------------------
# MAIN COMMANDS (Public API)
# ------------------------------------------------------------------------------
release: ; $(RUN) release       ## Publish a new version
build:   ; $(RUN) build $(ARGS) ## Compile the project
dev:     ; $(RUN) dev $(ARGS)   ## Start development server
start:   ; $(RUN) start $(ARGS) ## Run the app in production mode
lint:    ; $(RUN) lint          ## Run linter (ESLint/Prettier)
fmt:     ; $(RUN) fmt           ## Run formater (Prettier)
types:   ; $(RUN) check-types   ## Run TypeScript type checking
clean:   ; $(RUN) clean         ## Remove build artifacts and temp files
pack:    ; $(RUN) pack          ## Create a package tarball
docs:    ; $(RUN) docs          ## Generate technical documentation
test:    ; $(DENO) test $(ARGS)  ## Run test suite
install: ; $(DENO) install      ## Install project dependencies
update:  ; $(DENO) update --latest ## Update dependencies to latest versions

# ------------------------------------------------------------------------------
# ALIASES (Developer Ergonomics)
# ------------------------------------------------------------------------------
i:  install
u:  update
b:  build
d:  dev
s:  start
l:  lint
f:  fmt
t:  test
ts: types
c:  clean
pk: pack
do: docs

# .PHONY ensures these commands run even if a folder with the same name exists
.PHONY: release build dev start lint test types clean pack docs install update \
        i u b d s l f t ts c pk do



# lineo md 'src/**/*.ts' --outFile code.md --outDir temp	