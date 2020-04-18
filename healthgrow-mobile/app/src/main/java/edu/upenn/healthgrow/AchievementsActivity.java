package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class AchievementsActivity extends AppCompatActivity {

    private DataSource dataSource;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_achievements);
        dataSource = new DataSource();
    }
}
