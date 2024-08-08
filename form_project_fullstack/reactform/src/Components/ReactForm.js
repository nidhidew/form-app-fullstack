import React, { useState} from 'react'
import axios from 'axios';

const ReactForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("");
    const [resume, setResume] = useState("");
    const [url, setUrl] = useState("");
    const [selected, setSelected] = useState("");
    const [about, setAbout] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(
            firstName,
            lastName,
            email,
            about,
            contact,
            gender,
            resume,
            url,
            selected,
        );

        try {
                const response = await axios.post('http://localhost:8000/api/users', {
                        firstName,lastName,email,contact,gender,resume,url,selected,about
                });
                // setMessage('User added successfully')
                console.log(response.data); 
        } catch (error){
                // setMessage('Failed to add user')
                console.error('there was an error adding the user ',error);
        }
    }

    const handleReset = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setAbout("");
        setContact("");
        setGender("");
        setResume("");
        setSelected("");
        setUrl("");
    }; 

  return (
    <div>
      <h1>Form in React</h1>

      <form>
        <label>First Name*</label>
        <input type='text'
                placeholder='Enter First Name' 
                name="firstname"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required/>
        
        <label>Last Name *</label>
        <input type='text' 
                placeholder='Enter Last Name'
                name='lastname'
                id='lastname'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
                required/>
        
        <label for="email">Enter Email *</label>
        <input type='email' 
                placeholder='Enter Email Id'
                name='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
        
        <label for="tel">Contact *</label>
        <input type='number' 
                placeholder='Enter Mobile Number'
                name='contact'
                id='contact'
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required />

        <label for="gender">Gender *</label>
        
        <label><input type='radio'
                name='gender'
                value='male'
                id='male'
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}/>Male</label>
        
        <label><input type='radio'
                name='gender'
                value='female'
                id='female'
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}/>Female</label>
        
        <label><input type='radio'
                name='gender'
                value='other'
                id='other'
                checked={gender === 'other'}
                onChange={(e) => setGender(e.target.value)}/>Other</label>
        
        <label>Upload Resume *</label>
        <input type='file' 
                name='file'
                id='file'
                onChange={(e) => setResume(e.target.files[0])}
                required/>

        <label>Enter URL *</label>
        <input type='url' 
                placeholder='Enter URL' 
                name='url'
                id='url'
                onChange={(e) => setUrl(e.target.value)}
                required/>
        
        <label>Select your Choice</label>
        <select
            name='select'
            id='select'
            value={selected}
            onChange={(e => setSelected(e.target.value))}>
            <option value="" disabled selected={setSelected === ""}>Select your ans</option>
            <optgroup label="beginers">
                <option value="html">Html</option>
                <option value="css">Css</option>
                <option value="javascript">Javascript</option>
            </optgroup>
            <optgroup label="Advance">
                <option value="react">React</option>
                <option value="node">Node</option>
                <option value="mongodb">Mongodb</option>
            </optgroup>
        </select>
        
        <label for="about">About *</label>
        <textarea placeholder='About your self' 
                name="about"
                id="about"
                cols="30"
                rows="10"
                onChange={(e) => setAbout(e.target.value)}
                required></textarea>

        <button type='reset' value='reset' onClick={() => handleReset()}>Reset</button>
        <button type='submit' value='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  )
}

export default ReactForm
