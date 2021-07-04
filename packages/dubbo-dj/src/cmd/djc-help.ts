export function help() {
  console.log(`Usage: dj [options]

A dsl tool that generate dubbo code ❤️

Options:
  -V, --version   output the version number
  -i, --init      init dubbo dsl project in current dir
  -b, --build     support generate language such as java, go, ts (default: "ts")
  -h, --help      display help for command
  `)
}
