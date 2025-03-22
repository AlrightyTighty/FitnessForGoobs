import TopNav from "./TopNav";
import "./Exercises.css";
import { useEffect, useRef, useState } from "react";

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
}

interface ExerciseListingProps {
  exercise: Exercise;
}

interface ExerciseListProps {
  exercises: Exercise[];
}

const ExerciseListing: React.FC<ExerciseListingProps> = ({ exercise }) => {
  return (
    <li>
      <div>
        <span className="big-text">{exercise.name}</span>
        <br />
        <span className="small-text">{exercise.primaryMuscles[0]}</span>
      </div>
    </li>
  );
};

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
  return (
    <ul className="exercist-list">
      {exercises.map((exercise, index) => {
        return <ExerciseListing exercise={exercise} key={index} />;
      })}
    </ul>
  );
};

const Exercises = () => {
  const [exercises, setExercises] = useState([] as Exercise[]);
  const equipmentFilter = useRef(EquipmentFilter.NONE);
  const primaryMusclesFilter = useRef(PrimaryMuscleFilter.NONE);
  const difficultyFilter = useRef(LevelFilter.NONE);

  useEffect(() => {
    fetch("104.198.31.122:3001/exercises");
  }, [equipmentFilter, primaryMusclesFilter, difficultyFilter]);

  return (
    <>
      <div className="exercises-bg-image" />
      <TopNav />
      <div className="main-body-content">
        <div className="exercise-list-area">
          <div className="results-text">Showing x results.</div>
          <ExerciseList />
        </div>
        <div className="exercise-info-area"> test hehe</div>
      </div>
    </>
  );
};

export default Exercises;
