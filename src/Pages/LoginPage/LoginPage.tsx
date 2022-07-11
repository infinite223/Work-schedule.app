import { useNavigate, HiOutlineChevronDoubleLeft, motion } from '../../Helpers/imports';
import { showPage } from '../../Animations/variants';
import { useRef, useState } from 'react';
import { auth  } from "../../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { today, month } from '../../Helpers/constants';
import { db } from "../../firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { State } from '../../state';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useDispatch, useSelector } from 'react-redux';

import './LoginPage.scss'

export const LoginPage = () => {
  const navigate = useNavigate(); 
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const { setSchedule, setLoginPerson } = bindActionCreators(actionCreators, dispatch)
  const schedule = useSelector((state: State)=> state.schedule)

  async function handleSubmit(e:any) {
    e.preventDefault()
    const userEmail =  emailRef.current?.value?emailRef.current?.value.toString():"";
    const userPassword =  passwordRef.current?.value?passwordRef.current?.value.toString():"";

    try {
      setError("")
      await signInWithEmailAndPassword(auth, userEmail, userPassword).then( async ()=>{
        console.log("xd")
        const groupsRef = collection(db, "groups");  
       
        const workersData = await getDocs(groupsRef)
        let foundWorker, foundGroup:string = "";  

        workersData.docs.forEach((doc)=>{
          foundWorker = doc.data().workers.find((worker:{email:string, id:number, nickname:string})=> worker.email === userEmail)
          foundWorker&&(foundGroup = doc.data().nameGroup)
        })

        const scheduleRef = doc(db, "schedule", foundGroup);
        const scheduleSnap = await getDoc(scheduleRef);
        const nowMonth =  [month[today.getMonth()]+today.getFullYear()].toString();
        await setSchedule(scheduleSnap.data()?.[nowMonth])

              await auth.onAuthStateChanged( async (user) => {
               if (user) {
                 const personsCollectionRef = collection(db, "persons");   
                 const persons = await getDocs(personsCollectionRef)
                 const loginPerson = persons.docs.find((doc) => (doc.id===user.uid))                 
                 setLoginPerson(loginPerson?.data().nickname)
               }
             });
              await navigate("/schedule")
      })
    

    } catch {
      try {
        const groupsRef = collection(db, "groups");    
        const getGroups = async () => {
             const workersData = await getDocs(groupsRef)
             let foundWorker, foundGroup:string;
              workersData.docs.forEach((doc)=>{
                foundWorker = doc.data().workers.find((worker:{email:string, id:number, nickname:string})=> worker.email === userEmail)
                foundWorker&&(foundGroup = doc.data().nameGroup)
              })

              if(foundWorker){
                createUserWithEmailAndPassword(auth, userEmail, userPassword).then(async ()=>{
                  ///
                  await signInWithEmailAndPassword(auth, userEmail, userPassword)
                  const scheduleRef = doc(db, "schedule", foundGroup);
                  const scheduleSnap = await getDoc(scheduleRef);
                  const nowMonth =  [month[today.getMonth()]+today.getFullYear()].toString();
                  setSchedule(scheduleSnap.data()?.[nowMonth])
                  console.log(schedule)

                 // await setScheduleData();

                  // await auth.onAuthStateChanged( async (user) => {
                  //   if (user) {
                  //     const personsCollectionRef = collection(db, "persons");   
                  //     const persons = await getDocs(personsCollectionRef)
                  //     const loginPerson = persons.docs.find((doc) => (doc.id===user.uid))                 
                  //     setLoginPerson(loginPerson?.data().nickname)
                  //   }
                  // });
                 // await navigate("/schedule")
                  ////
                })
              }
              else {
                setError("Failed to log in")
              }
        };
        getGroups()
      }
      catch{
        setError("Failed to log in")
      }
    }
  }

  return (
    <div>
         <HiOutlineChevronDoubleLeft className='icon-exit'  onClick={()=>navigate("/")}/>
         <motion.div variants={showPage} initial="hidden" animate="visible" className='LoginPage flex'>  
         <form className='flex'  onSubmit={handleSubmit}>   
           <div className='Login__content flex'>
              <h1>Log In</h1>
              <p>
                if this is your first login, give your account a password
              </p>
             <input type="email" placeholder='E-mail' ref={emailRef} required/>
             <input type="password" placeholder='Password' ref={passwordRef} required/>
             <div className='error__message'>{error}</div>
           </div>  
           <button type="submit" className='login button'>Log In</button>
          </form>  
         </motion.div>
    </div>
  )
}
