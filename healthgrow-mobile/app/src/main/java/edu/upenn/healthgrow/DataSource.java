package edu.upenn.healthgrow;

import android.graphics.Bitmap;
import android.util.Log;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class DataSource {

    public void deleteUser(String email, String password) {
        try {
            URL url = new URL("http://10.0.2.2:3000/deleteuser");
            SetUserTask task = new SetUserTask(email, password, "");
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public void editUser(String email, String password, String name) {
        try {
            URL url = new URL("http://10.0.2.2:3000/edituser");
            SetUserTask task = new SetUserTask(email, password, name);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public void addUser(String email, String password, String name) {
        try {
            URL url = new URL("http://10.0.2.2:3000/createuser");
            SetUserTask task = new SetUserTask(email, password, name);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

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

    public void addMood(int rating, String[] tags, String text) {
        try {
            URL url = new URL("http://10.0.2.2:3000/createmood");
            SetMoodTask task = new SetMoodTask(rating, tags, text);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }


    public boolean signIn(String email, String password) {
        try {
            URL url = new URL("http://10.0.2.2:3000/signin");
            SignIn task = new SignIn(email, password);
            task.execute(url);
            boolean worked = task.get();
            return worked;
        }
        catch (Exception e) {
            return false;
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

    public ArrayList<String> getAllMealTypes() {
        try {
            URL url = new URL("http://10.0.2.2:3000/allmealtype");
            GetMealList task = new GetMealList();
            task.execute(url);
            ArrayList<String> types = task.get();
            return types;
        }
        catch (Exception e) {
            return null;
        }
    }

    public void addMealType(String name, int calories, String macro) {
        try {
            URL url = new URL("http://10.0.2.2:3000/createmealtype");
            AddMealTask task = new AddMealTask(name, calories, macro);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public void addMeal(String type, String mealStr) {
        try {
            URL url = new URL("http://10.0.2.2:3000/createmeal");
            CreateMealTask task = new CreateMealTask(type, mealStr);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public ArrayList<String> getAllLogs(String email) {
        try {
            URL[] urls = new URL[4];
            urls[0] = new URL("http://10.0.2.2:3000/getalllogsworkout");
            urls[1] = new URL("http://10.0.2.2:3000/getalllogsmeal");
            urls[2] = new URL("http://10.0.2.2:3000/getalllogsmood");
            urls[3] = new URL("http://10.0.2.2:3000/getalllogsjournal");
            GetAllLog task = new GetAllLog(email);
            task.execute(urls);
            return task.get();
        }
        catch (Exception e) {
            return null;
        }
    }
}
