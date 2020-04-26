package edu.upenn.healthgrow;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

public class AlarmReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("Notification", "Starting action");
        Toast.makeText(context, "Have you logged your mood today?", Toast.LENGTH_LONG).show();
    }
}
