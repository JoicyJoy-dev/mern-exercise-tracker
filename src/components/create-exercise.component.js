import React,{Component} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component{
constructor(props)
{
    super(props);

    this.onChangeUserName=this.onChangeUserName.bind(this);
    this.onChangeDescription=this.onChangeDescription.bind(this);
    this.onChangeDuration=this.onChangeDuration.bind(this);
    this.onChangeDate=this.onChangeDate.bind(this);
    this.onSubmit=this.onSubmit.bind(this);

    this.state={
        username:'',
        description:'',
        duration:0,
        date:new Date(),
        users:[]
    }
}

componentDidMount()
{
axios.get('https://mern-exercise-tracker2.herokuapp.com/users').
then(resposnse=>{
    if(resposnse.data.length>0)
        {
     this.setState({
         users:resposnse.data.map(user=>user.username),
         username:resposnse.data[0].username
     });
        }
});


}

onChangeUserName(e)
{
    this.setState({
        username:e.target.value
    });
}


onChangeDescription(e)
{
    this.setState({
        description:e.target.value
    });
}

onChangeDuration(e)
{
    this.setState({
        duration:e.target.value
    });
}

onChangeDate(date)
{
    this.setState({
        date:date
    });
}

onSubmit(e)
{
    e.preventDefault();

    const exercise={
        username:this.state.username,
       description:this.state.description,
       duration:this.state.duration,
       date:this.state.date
    }

    console.log(exercise);

axios.post('https://mern-exercise-tracker2.herokuapp.com/exercises/add',exercise)
.then(res=>console.log(res.data));

    window.location='/';
}


    render()
    {
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
<div className="form-group">
<label >User name:</label>
<select ref="userInput" 
required 
className="form-control" 
value={this.state.username} 
onChange={this.state.onChangeUserName}>
    {
this.state.users.map(function(user){
    return <option key={user} value={user}>
            {user}
            </option>
})
    }
</select>
</div>
 
<div className="form-group">
<label>Description</label>
<input type="text" className="form-control" required value={this.state.description} onChange={this.onChangeDescription}></input>
</div>

<div className="form-group">
<label>Duration (in minutes): </label>
<input type="text" className="form=control"
 value={this.state.duration} onChange={this.onChangeDuration}></input>
</div>


<div className="form-group">
<label>Date: </label>
<div>
    <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
</div>
</div>

<br/>
<div className="form-group">
<input type="submit" value="Create Exercise Log" className="btn btn-primary"></input>
</div>

                </form>
            </div>
        )
    }
}




