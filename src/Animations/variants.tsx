export const sentence = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.07,
      }
    }
  }
  
export const show = {
    hidden: {opacity: 0, background: "linear-gradient(120deg, rgb(248, 94, 38) 50%, rgba(254, 4, 254,.1) 100%)"},
    visible: {
      opacity: 1,
      transition: {
        delay: .1,
        duration:1.5,
      }
    },
    hoverAdmin:{
      background: "linear-gradient(320deg, rgb(248, 94, 38) 15%, rgba(254, 4, 254,.1) 100%)",
      transition: {
        duration: .7,
      }
    }
  }  

export const letter = {
    hidden: {opacity: 0, y: 50},
    visible: {
      opacity: 1,
      y:0,
      transition:{
        duration:.7,
      },
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
  outsideRight: {
    opacity: 0,
     x: 200,
     background: "linear-gradient(120deg, rgb(248, 94, 38) 50%, rgba(254, 4, 254,.1) 100%)",
    },
  outsideTop: {opacity: 0, y: -200},
  goodPosition: {
    opacity: 1,
    y:0,
    x:0,
    transition: {
      duration: 1.5,
    }
  },
  hoverWorker:{
    scale:1.1,
    background: "linear-gradient(120deg, rgb(248, 94, 38) 10%, rgba(254, 4, 254,.14) 80%)",
    cursor:"pointer",
    transition: {
      duration: .7,
    }
  }
}