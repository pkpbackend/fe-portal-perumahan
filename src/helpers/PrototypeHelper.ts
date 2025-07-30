export const applyPrototypes = () => {
  Object.assign(String.prototype, {

    toTitleCase() {
      const sentence = this.toLowerCase().split(' ')
  
      for (let i = 0; i < sentence.length; i++) {
        if (sentence[i].length > 0) {
          sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
        }
      }
      
      return sentence.join(' ')
    },

    getInitialChars(limit?: number) {
      let chars = ''
      const sentence = this.toUpperCase().split(' ')

      for (let i = 0; i < sentence.length; i++) {
        if (limit && limit === i) break
        chars += sentence[i].substr(0, 1)
      }

      return chars
    },

  })
}