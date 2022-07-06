export const showMobilePage = {
    hidden: {opacity: 0, scale:1, y:-400},
    visible: {
      opacity: 1, scale:1, y:0,
      transition: {
        delay:.2,
        duration:1,
      }
    }  
}

export const showSchedule = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      delay:.6,
      duration:2.5,
    }
  }  
}

export const showDay = {
  hidden: {opacity:0, x:"-100"},
  visible:{opacity:1, x:"0",
  transition: {
    duration:.3,
  }
},
  exit:{opacity:0, scale:[".9", ".8", ".4", ".1"]}
}
export const showMenuModal = {
  hidden: {opacity:0, scale:.1},
  visible:{opacity:1, scale:1},
 exit:{opacity:0, scale:[".9", ".8", ".4", ".1"]}
}
