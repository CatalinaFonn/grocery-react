import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

//Load datas
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return (list = JSON.parse(localStorage.getItem('list')));
  }else{
    return [];
  }
};

function App() {

  const [name, setName] = useState('');//INPUT VALUE
  const [list, setList] = useState(getLocalStorage());//CONTAINER
  const [isEditing, setIsEditing] =useState(false);
  const [editID, setEditID] =useState(null);
  const [alert, setAlert] = useState({
    
    show: false, 
    msg:'', 
    type:''
  })

  //event handler
  const handleSubmit = (e) => {
    e.preventDefault();
    //cannot enter empty value, ('') is falsy value
    if(!name){
      
      // setAlert({show:true, msg:'please enter value', type:'danger'})
      showAlert(true, 'please enter value', 'danger')
  

    }
    else if(name && isEditing){
      //deal with edit
       setList(
         list.map( item => {
           if(item.id === editID){
             return { ...item, title: name}; //override the title
           }
           return item;//else if don't match ID, do nothing
         })
       )
       //done editing?
       setName('')
       setIsEditing(false)
       setEditID(null)
       showAlert(true,'value changed','success')

       
    }
    //if I have value in name and is not editing, then:
    else{
      showAlert(true, 'item added to the list', 'success')
      //each list item has Id and title
      const newItem = { 
        id: new Date().getTime().toString(),
        title: name
      }
      setList([...list,newItem]);
      setName('')

    }
  }

  //To speed up setting multiple state, create a function to handle setAlert
  const showAlert = (show=false, msg='', type='' )=>{
    setAlert( {show:show, msg, type} )
  }
  //Clear all list
  const clearList = () => {
    showAlert(true,'empty list', 'danger')
    setList([])
  
  }

  //delete single list
  const removeItem = (id) => {
    showAlert(true, 'item removed', 'danger')
    setList(list.filter(item => item.id !== id))

  }

  //edit single list
  const editItem = (id) =>{
    /* find() method returns the value of the first element in an array 
       that pass a test (provided as a function). */
    const specificItem = list.find(item => item.id === id);
    setIsEditing(true)
    setEditID(id)//we need to reassign the title if we match this ID
    setName(specificItem.title) //change the title of that item

  }

  //Local storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <>
     <div className="alert-container">
         {/* ALERT BOX */}
         {alert.show && <Alert {...alert} showAlert={showAlert} setAlert={setAlert} list={list} />}
     </div>
    <section className="section-center">
      <form 
        className="grocery-form"
        onSubmit={handleSubmit}
      >
       

        <h3>grocery bud</h3>
        <div className="form-control">
          <input 
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={ (e)=>{setName(e.target.value)} }
          />
          <button 
            type="submit" 
            className="submit-btn"
          >
            {isEditing? 'edit' : 'submit'}
          </button>
        </div>

      </form>
      {
        list.length > 0 && (

          <div className="grocery-container">
            <List 
                items={list} 
                removeItem={removeItem} 
                editItem={editItem}    
            />
            <button 
              className="clear-btn"
              onClick={clearList}
            >
            clear items
            </button>
          </div>
        )

      }

    </section>
    </>
  )
}
export default App;
