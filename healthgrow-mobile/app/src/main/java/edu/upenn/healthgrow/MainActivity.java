package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private boolean isSignedIn;
    private String email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent intent = getIntent();
        isSignedIn = intent.getBooleanExtra("signedIn", false);
        email = intent.getStringExtra("email");

        if (isSignedIn) {
            String newText = "Signed In as " + email;
            ((TextView) findViewById(R.id.textView)).setText(newText);
            ((Button) findViewById(R.id.button7)).setText("sign out");
        }

    }

    protected void onSaveInstanceState(Bundle state) {
        super.onSaveInstanceState(state);
        Log.d("debug", "osis main activity");
        state.putSerializable("email", email);
        state.putSerializable("isSignedIn", isSignedIn);
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

    public void onAchievements(View view) {
        if (!isSignedIn) {
            return;
        }
        Intent i = new Intent(this, AchievementsActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onDeleteUser(View view) {
        if (!isSignedIn) {
            return;
        }
        Intent i = new Intent(this, DeleteUserActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onEditUser(View view) {
        if (!isSignedIn) {
            return;
        }
        Intent i = new Intent(this, EditUserActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onClickUser(View view) {
        if (isSignedIn) {
            return;
        }
        Intent i = new Intent(this, UserActivity.class);
        startActivityForResult(i, 1);
    }

    public void onClickWorkout(View view) {
        if (!isSignedIn) {
            return;
        }
        Intent i = new Intent(this, WorkoutLogActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onClickJournal(View view) {
        if (!isSignedIn) {
            return;
        }
        Intent i = new Intent(this, JournalLogActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    //log mental health
    public void onClickMood(View view) {
        if (!isSignedIn) {
            return;
        }
        Intent i = new Intent(this, MoodLogActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onClickContact(View view) {
        if (!isSignedIn) {
            return;
        }
        Intent i = new Intent(this, ContactActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

}
