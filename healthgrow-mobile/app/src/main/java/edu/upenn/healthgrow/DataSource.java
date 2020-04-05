package edu.upenn.healthgrow;

import android.graphics.Bitmap;
import android.util.Log;

import java.net.URL;
import java.util.List;

public class DataSource {
    public void addWorkout(String workout, int reps, int weight, String img) {
        try {
            URL url = new URL("http://10.0.2.2:3000/createworkout");
            SetWorkoutTask task = new SetWorkoutTask(workout, reps, weight, img);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public void addJournal(String title, String text) {
        try {
            URL url = new URL("http://10.0.2.2:3000/createjournal");
            SetJournalTask task = new SetJournalTask(title, text);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public List<String> getWorkoutTypes() {
        try {
            URL url = new URL("http://10.0.2.2:3000/allworkouttype");
            GetWorkoutList task = new GetWorkoutList();
            task.execute(url);
            List<String> names = task.get();
            return names;
        }
        catch (Exception e) {
            return null;
        }
    }
}
