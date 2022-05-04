export const sentence = {
    hidden: {opacity: 1},
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.08,
      }
    }
  }

export const letter = {
    hidden: {opacity: 0, y: 50},
    visible: {
      opacity: 1,
      y:0,
    },
  }

export const button = {
    hidden: {opacity: 0, y: 100},
    goodPosition: {
      opacity: 1,
      y:0,
      transition: {
        delay: 1.5,
        duration: 1.5,
      }
    },
    hover:{
      scale:1.12,
      border: "3px solid #FF00FF",
      color: "#FF00FF",
      transition: {
        duration: .3,
      }
    },
  }

export const position = {
  outside: {opacity: 0, x: 200},
  goodPosition: {
    opacity: 1,
    x:0,
    transition: {
      duration: 1.5,
    }
  },
}