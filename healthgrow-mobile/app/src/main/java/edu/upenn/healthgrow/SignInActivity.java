package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class SignInActivity extends AppCompatActivity {

    private DataSource dataSource;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);
        dataSource = new DataSource();
    }

    public void onSignIn(View view) {
        String email = ((EditText)findViewById(R.id.email)).getText().toString();
        String password = ((EditText)findViewById(R.id.password)).getText().toString();
        boolean worked = dataSource.signIn(email, password);

        if (worked) {
            Intent intent = new Intent(this, MainActivity.class);
            intent.putExtra("signedIn", true);
            intent.putExtra("email", email);
            startActivity(intent);
        } else {
            Toast.makeText(this, "Incorrect Username or Password", Toast.LENGTH_LONG).show();
        }

    }
}
