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
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        delay: .1,
        duration:2,
      }
    },
    hover:{
      background: "linear-gradient(120deg, rgba(8, 0, 2, 0.3) 10%, rgba(254, 4, 254,.02) 100%)",
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
    },
  outsideTop: {opacity: 0, x: 200},
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
    background: "linear-gradient(120deg, rgba(8, 0, 2, 0.3) 10%, rgba(254, 4, 254,.02) 100%)",
    cursor:"pointer",
    transition: {
      duration: .4,
    }
  }
}