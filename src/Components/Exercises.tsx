import TopNav from "./TopNav";
import "./Exercises.css";
import { useEffect, useRef, useState } from "react";
import queryString from "query-string";

// enum for exercise filters

enum EquipmentFilter {
  BODY_ONLY = "body only",
  MACHINE = "machine",
  OTHER = "other",
  FOAM_ROLL = "foam roll",
  NONE = "",
  KETTLEBELLS = "kettlebells",
  DUMBBELL = "dumbbell",
  CABLE = "cable",
  BARBELL = "barbell",
  BANDS = "bands",
  MEDICINE_BALL = "medicine ball",
  EXERCISE_BALL = "exercise ball",
}

enum LevelFilter {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  EXPERT = "expert",
  NONE = "",
}

enum PrimaryMuscleFilter {
  ABDOMINALS = "abdominals",
  HAMSTRINGS = "hamstrings",
  ABDUCTORS = "abductors",
  QUADRICEPS = "quadriceps",
  BICEPS = "biceps",
  SHOULDERS = "shoulders",
  CHEST = "chest",
  MIDDLE_BACK = "middle back",
  CALVES = "calves",
  GLUTES = "glutes",
  LOWER_BACK = "lower back",
  LATS = "lats",
  TRICEPS = "triceps",
  NONE = "",
}

interface Exercise {
  name: string;
  level: string;
  equipment: string;
  primaryMuscles: string[];
  instructions: string[];
}

interface ExerciseListingProps {
  exercise: Exercise;
  setSelectedExercise: React.Dispatch<React.SetStateAction<Exercise | null>>;
}

interface ExerciseListProps {
  exercises: Exercise[];
  setSelectedExercise: React.Dispatch<React.SetStateAction<Exercise | null>>;
}

const ExerciseListing: React.FC<ExerciseListingProps> = ({ exercise, setSelectedExercise }) => {
  return (
    <li
      onClick={() => {
        setSelectedExercise(exercise);
      }}
    >
      <div>
        <span className="big-text">{exercise.name}</span>
        <br />
        <span className="small-text">
          {exercise.primaryMuscles[0]} • {exercise.equipment} • {exercise.level}
        </span>
      </div>
    </li>
  );
};

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, setSelectedExercise }) => {
  return (
    <ul className="exercise-list">
      {exercises.map((exercise, index) => {
        return <ExerciseListing exercise={exercise} key={index} setSelectedExercise={setSelectedExercise} />;
      })}
    </ul>
  );
};

// we're just hardcoding in videos LOLLL
// #CopyrightInfringement #Awesome

const exercise_gifs = new Map<string, string>();
exercise_gifs.set("Barbell Side Bend", "https://fitnessprogramer.com/wp-content/uploads/2021/09/Barbell-Side-Bend.gif");

const Exercises = () => {
  const [exercises, setExercises] = useState([] as Exercise[]);
  const [selectedExercise, setSelectedExercise] = useState(null as Exercise | null);
  const equipmentFilter = useRef(EquipmentFilter.NONE);
  const primaryMusclesFilter = useRef(PrimaryMuscleFilter.GLUTES);
  const difficultyFilter = useRef(LevelFilter.NONE);

  useEffect(() => {
    const searchParams = queryString.stringify({
      level: difficultyFilter.current,
      equipment: equipmentFilter.current,
      primaryMuscles: primaryMusclesFilter.current,
    });

    console.log(searchParams);

    fetch("http://localhost:3001/exercises?" + searchParams, {
      method: "GET",
    })
      .then((results) => {
        console.log(
          results.json().then((json) => {
            setExercises(json);
            setSelectedExercise(json[0]);
          })
        );
      })
      .catch((error) => console.log(error));
  }, [equipmentFilter, primaryMusclesFilter, difficultyFilter]);

  return (
    <>
      <div className="exercises-bg-image" />
      <TopNav />
      <div className="main-body-content">
        <div className="exercise-list-area">
          <div className="results-text">{exercises ? "Showing " + exercises.length + " results." : ""}</div>
          <ExerciseList exercises={exercises} setSelectedExercise={setSelectedExercise} />
        </div>
        <div className="exercise-info-area">
          <div className="selected-exercise-name">{selectedExercise ? selectedExercise.name : ""}</div>
          <div className="selected-exercise-info">{selectedExercise ? selectedExercise.primaryMuscles[0] + " • " + selectedExercise.equipment + " • " + selectedExercise.level : ""}</div>
          <img
            src={
              selectedExercise && exercise_gifs.has(selectedExercise.name)
                ? exercise_gifs.get(selectedExercise.name)
                : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
          />
          <ul className="selected-exercise-instructions">
            {selectedExercise
              ? selectedExercise.instructions.map((instruction, index) => {
                  return (
                    <li className="exercise-instruction">
                      {index + 1}. {instruction}
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Exercises;
