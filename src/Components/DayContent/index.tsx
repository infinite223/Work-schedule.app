import './DayContentStyle.scss'

interface IPerson {
    name: string;
    startWork: string;
    endWork: string;
}

export const DayContent:React.FC<{ id:number, date: Date,   persons: Array<IPerson> }> = (id, persons) => {

  console.log(persons[0])  
  return (
    <div className='DayContent flex'>{persons[0]?persons[0]:<>xd</>}</div>
  )
}
