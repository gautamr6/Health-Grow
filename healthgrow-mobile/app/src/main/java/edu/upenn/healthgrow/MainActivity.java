package edu.upenn.healthgrow;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.Calendar;
import java.util.TimeZone;

public class MainActivity extends AppCompatActivity {

    private boolean isSignedIn;
    private String email;

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent intent = getIntent();
        isSignedIn = intent.getBooleanExtra("signedIn", false);
        email = intent.getStringExtra("email");

        Log.d("Notification", "onCreate");

        if (isSignedIn) {
            Log.d("Notification", "isSignedIn");

            String newText = "Signed In as " + email;
            ((TextView) findViewById(R.id.textView)).setText(newText);


            start();
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    private void start() {
        Log.d("Notification", "start method");

        AlarmManager manager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        Intent alarmIntent = new Intent(this, AlarmReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(this, 1, alarmIntent, 0);

        int interval = 1000 * 30;

        Calendar calendar = Calendar.getInstance();
//        calendar.set(Calendar.HOUR_OF_DAY, 20);
//        calendar.set(Calendar.MINUTE, 2);
//        calendar.set(Calendar.SECOND, 0);

//        manager.setExact(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent);
        manager.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), interval, pendingIntent);
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
