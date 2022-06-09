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
      backgroundColor:"rgb(30, 29, 29)",
      opacity: 1,
      transition: {
        delay:.2,
        duration:.5,
      }
    },
    hover:{
      backgroundColor: "rgb(35, 34, 34)",
      transition: {
        duration: .2,
      }
    }
  }  

  export const showDay = {
    hidden: {opacity:0, top:"10px"},
    visible:{opacity:1, top:"50%", scaleX:"1"},
    exit:{opacity:0, scale:[".9", ".8", ".4", ".1"]}
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
    scale:.9,
    backgroundColor: "rgb(25, 24, 24)",
    cursor:"pointer",
    transition: {
      duration: .4,
    }
  }
}