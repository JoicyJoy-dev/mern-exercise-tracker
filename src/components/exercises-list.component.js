import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// const Exercise = (props) => {
//   ///// Functional Component
//   //   <tr>
//   //     <td>{props.exercise.username}</td>
//   //     <td>{props.exercise.description}</td>
//   //     <td>{props.exercise.duration}</td>
//   //     <td>{props.exercise.date.substring(0, 10)}</td>
//   //     <td>
//   //       <Link to={"/edit/" + props.exercise._id}>edit</Link>|
//   //       <a
//   //         href="#"
//   //         onClick={() => {
//   //           props.deleteExercise(props.exercise._id);
//   //         }}
//   //       >
//   //         delete
//   //       </a>
//   //     </td>
//   //   </tr>;
//   // <tr>
//   //   <td>test</td>
//   //   <td>test</td>
//   //   <td>test</td>
//   //   <td>test</td>
//   //   <td>test</td>
//   // </tr>;
// };

const Exercise= (props) =>
{
return( <tr>
  <td> {props.exercise.username}</td>
  <td> {props.exercise.description}</td>
  <td> {props.exercise.duration}</td>
  <td> {props.exercise.date.substring(0,10)}</td>
  <td> <Link to={"/edit/"+props.exercise._id}>edit</Link></td>
  <td><button href="#" onClick={()=>{props.deleteExercise(props.exercise._id);}}>Delete</button></td>
  


</tr>
);
   
}

export default class ExercisesList extends Component {   /////// Class Component

  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.exerciseList = this.exerciseList.bind(this);

    this.state = { exercises: [] };
  }

  componentWillMount() {
    axios
      .get("https://mern-exercise-tracker2.herokuapp.com/exercises")
      .then((response) => {
        if (response.data.length > 0) {
          console.log(response.data);

          const exer = response.data;
          this.setState({ exercises: exer });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    axios.delete("https://mern-exercise-tracker2.herokuapp.com/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  // exerciseList() {
  //   return this.state.exercises.map((data) => {
  //     return (
  //       // <Exercise
  //       //   exercise={currentexercise}
  //       //   deleteExercise={this.deleteExercise}
  //       //   key={currentexercise._id}
  //       // />
  //       // <Exercise/>
  //       <tr>
  //         <td>{data.username}</td>
  //         <td>{data.description}</td>
  //         <td>{data.duration}</td>
  //         <td>{data.date}</td>
  //         <td>
  //           <button
  //             href="#"
  //             onClick={() => {
  //               this.deleteExercise(data._id);
  //             }}
  //           >
  //             DELETE
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // }

  exerciseList()
  {
    return(
      this.state.exercises.map((currentExercise)=>{
        return (<Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}></Exercise>)
      })
    );

  }

  render() {
    return (
      <div>
        <h3>Logged exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
