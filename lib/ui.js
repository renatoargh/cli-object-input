const readline = require('readline')
const assert = require('assert')
const ElementFactory = require('./elementFactory')
const beep = () => process.stderr.write('\007')
const hideCursor = () => process.stderr.write('\x1B[?25l')
const showCursor = () => process.stderr.write('\x1B[?25h')

class Ui {
  constructor(swagger) {
    this._root = ElementFactory.build(swagger)
    this._selected = this._root.next()
    this._active = true

    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      historySize: 0
    }) 
  }

  get input() {
    const render = this._root.toJSON()
    
    try {
      return JSON.parse(render)
    } catch (err) {
      console.log('Error generating object when parsing the following string:')
      console.log(render)
      
      throw err
    }
  }

  _resetCursor(lines) {
    readline.moveCursor(process.stdout, 0, lines * -1)
    readline.cursorTo(process.stdout, 0)
  }

  _render() {
    const output = this._root.render()
    const lines = output.split('\n').length

    hideCursor()
    process.stdout.write(output)
    this._resetCursor(lines)

    const [x, y] = this._selected.offset()
    readline.moveCursor(process.stdout, x, y + 1)

    if (this._selected.requiresCursor) {
      showCursor()
    }

    return () => {
      const [, y] = this._selected.offset()
      this._resetCursor(y)
      readline.clearScreenDown(process.stdout)
    }
  }

  _onKeypress(done) {
    let clear = this._render()

    return (char, key) => {
      if (!this._active) {
        return
      }

      clear()
      // console.log(JSON.stringify(key, null, 2))

      if (key.name === 'return') {
        if (this._root.validate()) {
          this._rl.close()
          this._active = false

          showCursor()
          this._resetCursor(1)
          return done(this.input)
        }
      } else if (key.ctrl && (key.name === 'c' || key.name === 'd')) {
        showCursor()
        process.exit(0)
      } else if (key.ctrl && key.name === 'p') {
        this._selected = this._selected.parent()
      } else if (key.ctrl && key.name === 'n') {
        this._selected = this._selected.setNull()
      } else if (key.name === 'left') {
        this._selected.cursorLeft()
      } else if (key.name === 'right') {
        this._selected.cursorRight()
      } else if (key.name === 'up') {
        this._selected.nextEnum()
      } else if (key.name === 'down') {
        this._selected.previousEnum()
      } else if (key.name === 'backspace') {
        this._selected.backspace()
      } else if (key.name === 'tab') {
        this._selected = this._selected.next()
      } else if (char) {
        this._selected = this._selected.append(char)
      }

      assert(this._selected, 'No element selected')

      if (this._selected.hasMessage) {
        beep()
      }

      clear = this._render()
    }  
  }

  async getUserInput() {
    readline.emitKeypressEvents(process.stdin, this._rl)

    this._resetCursor(1)
    readline.clearLine(process.stdout, 0)

    return new Promise(done => process.stdin.on('keypress', this._onKeypress(done)))
  }
}

process.on('uncaughtException', (err) => {
  showCursor()
  throw err
})

module.exports = Ui