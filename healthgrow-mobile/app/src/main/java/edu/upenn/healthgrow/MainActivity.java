package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onClickWorkout(View view) {
        Intent i = new Intent(this, WorkoutLogActivity.class);
        startActivityForResult(i, 1);
    }

    public void onClickJournal(View view) {
        Intent i = new Intent(this, JournalLogActivity.class);
        startActivityForResult(i, 1);
    }

    //log mental health
    public void onClickMood(View view) {
        Intent i = new Intent(this, MoodLogActivity.class);
        startActivityForResult(i, 1);
    }

}
