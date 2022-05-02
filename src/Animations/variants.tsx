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
      scale:1.2,
      border: "3px solid #FF00FF",
      color: "#FF00FF",
      transition: {
        duration: .3,
      }
    },
  }