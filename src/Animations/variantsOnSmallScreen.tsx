export const showMobilePage = {
    hidden: {opacity: 0, scale:1, y:400},
    visible: {
      opacity: 1, scale:1, y:0,
      transition: {
        delay:.2,
        duration:.5,
      }
    }  
}

export const showDay = {
  hidden: {opacity:0, top:"10px"},
  visible:{opacity:1, top:"50%", scaleX:"1",
  transition: {
    duration:.5,
  }
},
  exit:{opacity:0, scale:[".9", ".8", ".4", ".1"]}
}
