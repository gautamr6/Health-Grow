package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private boolean isSignedIn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent intent = getIntent();
        boolean signedIn = intent.getBooleanExtra("signedIn", false);
        if (signedIn) {
            ((TextView)findViewById(R.id.textView)).setText("Signed In");
            ((Button)findViewById(R.id.button7)).setText("sign out");
            isSignedIn = true;
        }
    }

    public void onSignIn(View view) {
        if (isSignedIn) {
            ((TextView)findViewById(R.id.textView)).setText("Not Signed In");
            ((Button)findViewById(R.id.button7)).setText("sign in");
            isSignedIn = false;
        } else {
            Intent i = new Intent(this, SignInActivity.class);
            startActivityForResult(i, 1);
        }
    }

    public void onDeleteUser(View view) {
        Intent i = new Intent(this, DeleteUserActivity.class);
        startActivityForResult(i, 1);
    }

    public void onEditUser(View view) {
        Intent i = new Intent(this, EditUserActivity.class);
        startActivityForResult(i, 1);
    }

    public void onClickUser(View view) {
        Intent i = new Intent(this, UserActivity.class);
        startActivityForResult(i, 1);
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

    public void onClickContact(View view) {
        Intent i = new Intent(this, ContactActivity.class);
        startActivityForResult(i, 1);
    }

    public void onClickMeal(View view) {
        Intent i = new Intent(this, EatLogActivity.class);
        startActivityForResult(i, 1);
    }

}
