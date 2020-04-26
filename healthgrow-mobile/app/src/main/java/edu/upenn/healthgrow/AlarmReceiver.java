package edu.upenn.healthgrow;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

public class AlarmReceiver extends BroadcastReceiver {

    private DataSource dataSource;

    @Override
    public void onReceive(Context context, Intent intent) {

        dataSource = new DataSource();
        //String email = intent.getStringExtra("email");
        String email = MainActivity.email;
        if (email == null) {
            Log.d("Notification", "null email");
        }

        if (dataSource.isMood(email)) {
            Log.d("Notification", "yes mood");
        } else {
            Log.d("Notification", "no mood");
            Toast.makeText(context, "You haven't logged your mood today!", Toast.LENGTH_LONG).show();
        }

    }
}
