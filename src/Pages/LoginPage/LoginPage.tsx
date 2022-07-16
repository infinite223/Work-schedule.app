import { useNavigate, HiOutlineChevronDoubleLeft, motion } from '../../Helpers/imports';
import { showPage } from '../../Animations/variants';
import { useRef, useState, useEffect } from 'react';
import { auth  } from "../../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { today, month } from '../../Helpers/constants';
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import { setScheduleFromFirebase, setLoginPersonAndGroupFromFirebase } from '../../Helpers/functions/functions';
import { workerAfterSign, workerBeforSign } from '../../Helpers/types';
import LoadingStatus from '../../Components/LoadingStatus';

import './LoginPage.scss'

export const LoginPage = () => {
  const navigate = useNavigate(); 
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const {  setLoginPerson, setGroup } = bindActionCreators(actionCreators, dispatch)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    console.log(loading)
  },[loading])

  async function handleSubmit(e:any) {
    e.preventDefault()
    const userEmail =  emailRef.current?.value?emailRef.current?.value.toString():"";
    const userPassword =  passwordRef.current?.value?passwordRef.current?.value.toString():"";
    setLoading(true)
    try {
      setError("")
      await signInWithEmailAndPassword(auth, userEmail, userPassword).then( async ()=>{
         const groupsRef = collection(db, "groups");       
         const workersData = await getDocs(groupsRef)
         let foundWorker, foundGroup:string = "";  

         workersData.docs.forEach((doc)=>{
           foundWorker = doc.data().workers.find((worker:workerBeforSign)=> worker.email === userEmail)
           foundWorker&&(foundGroup = doc.data().nameGroup)
         })

          await setScheduleFromFirebase(dispatch, foundGroup)

          await auth.onAuthStateChanged( async (user) => {
            if (user) {
              await setLoginPersonAndGroupFromFirebase(dispatch, user.uid)
              await navigate("/schedule")        
             }
           });         
      })
    

    } catch {
      try {
        const groupsRef = collection(db, "groups");    
        const getGroups = async () => {
             const workersData = await getDocs(groupsRef)
             let foundWorker, foundGroup:string;
             let workers:Array<{email:string, id:number, nickname:string}>;
              workersData.docs.forEach((doc)=>{
                if(doc.data().workers.find((worker:workerBeforSign)=> worker.email === userEmail)){
                  foundWorker = doc.data().workers.find((worker:workerBeforSign)=> worker.email)
                  foundWorker&&(foundGroup = doc.data().nameGroup)
                  foundWorker&&(workers = doc.data().workers)
                }
              })
              //console.log(foundWorker)
              if(foundWorker){
                console.log("xsd")
                 createUserWithEmailAndPassword(auth, userEmail, userPassword).then(async () =>{
                  await signInWithEmailAndPassword(auth, userEmail, userPassword)             
                  setScheduleFromFirebase(dispatch, foundGroup)

                  await auth.onAuthStateChanged( async (user) => {
                    if (user) {
                      const newWorkers:Array<workerAfterSign> = [];
                      workers.forEach((worker)=>{                   
                          if(worker.email === userEmail){
                            const emailWorker = worker.email
                            const nicknameWorker = worker.nickname
                            const idWorker = worker.id
                            newWorkers.push({email:emailWorker, id:idWorker, nickname:nicknameWorker, UID:user.uid})
                            setLoginPerson(nicknameWorker)
                          }
                          else {
                            newWorkers.push(worker)
                          }
                      })                           
                      const groupsRef = doc(db, "groups", foundGroup);
                           await updateDoc(groupsRef, {
                             "workers": newWorkers
                    }).then(()=>setLoading(false))}

                    await navigate("/schedule")                  
                  })
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
        {loading&&<LoadingStatus/> }
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
