const readline = require('readline')
const ElementFactory = require('./elementFactory')

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
    const render = this._root.render()
    
    try {
      return JSON.parse(render)
    } catch (err) {
      console.log('> Erro gerando resultado:')
      console.log(render + '\n')
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

    process.stdout.write(output)
    this._resetCursor(lines)

    const [x, y] = this._selected.offset()
    // process.stdout.write('' + x + '/' + y)
    readline.moveCursor(process.stdout, x, y)

    return () => {
      this._resetCursor(lines)
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
        this._rl.close()
        this._active = false
        return done(this.input)
      } else if (key.ctrl && key.name === 'c') {
        process.exit(0)
      } else if (key.sequence === '\u001f') {
        console.log('MENOS')
      } else if (key.ctrl && key.name === 'n') {
        this._selected.setNull()
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
      } else if (key.shift && key.name === 'tab') {
        this._selected = this._selected.previous()
      } else if (key.name === 'tab') {
        this._selected = this._selected.next()
      } else if (char) {
        this._selected.concat(char)
      }

      clear = this._render()
    }  
  }

  async getValues() {
    readline.emitKeypressEvents(process.stdin, this._rl)
    return new Promise(done => process.stdin.on('keypress', this._onKeypress(done)))
  }
}

module.exports = Ui