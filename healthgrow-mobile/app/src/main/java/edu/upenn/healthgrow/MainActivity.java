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
        }

    }

//    protected void onSaveInstanceState(Bundle state) {
//        super.onSaveInstanceState(state);
//        Log.d("debug", "osis main activity");
//        state.putSerializable("email", email);
//        state.putSerializable("isSignedIn", isSignedIn);
//    }

    public void onClickGeneral(View view) {
        Intent intent = new Intent(this, NewGeneralLogActivity.class);
        intent.putExtra("signedIn", true);
        intent.putExtra("email", email);
        startActivity(intent);
    }

    public void onLogOut(View view) {
        String newText = "Not Signed In";
        ((TextView) findViewById(R.id.textView)).setText(newText);
        Intent i = new Intent(this, SignInActivity.class);
        startActivity(i);
    }

    public void onAchievements(View view) {
        Intent i = new Intent(this, AchievementsActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onDeleteUser(View view) {
        Intent i = new Intent(this, DeleteUserActivity.class);
        i.putExtra("email", email);
        startActivity(i);
    }

    public void onEditUser(View view) {
        Intent i = new Intent(this, EditUserActivity.class);
        i.putExtra("email", email);
        startActivity(i);
    }

    public void onClickContact(View view) {
        Intent i = new Intent(this, ContactActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onClickLog(View view) {
        Intent i = new Intent(this, ViewAllLogActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

}
