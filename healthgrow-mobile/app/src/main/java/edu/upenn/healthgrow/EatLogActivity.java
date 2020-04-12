package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Spinner;

import java.util.ArrayList;
import java.util.List;

public class EatLogActivity extends AppCompatActivity {

    private DataSource dataSource;
    private ArrayList<String> meals;
    private ArrayAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_eat_log);
        dataSource = new DataSource();
        List<String> names = new ArrayList<>();
        names.add("Breakfast");
        names.add("Lunch");
        names.add("Dinner");
        Spinner spinner = (Spinner)findViewById(R.id.mealtype);
        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, names);
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(arrayAdapter);

        //populate listview
        meals = dataSource.getMeals();
        adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_multiple_choice, meals);
        ListView listview = (ListView) findViewById(R.id.foodlist) ;
        listview.setAdapter(adapter) ;
    }

    public void onClickAdd(View view) {
        Intent i = new Intent(this, AddMealActivity.class);
        i.putStringArrayListExtra("meals", meals);
        startActivityForResult(i, 1);
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {

        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 1) {

            if (resultCode == RESULT_OK) {
                adapter.notifyDataSetChanged();
            }
            if (resultCode == RESULT_CANCELED) {
                //Write your code if there's no result
            }
        }
    }//onActivityResult

    public void onClickSave(View view) {
        Intent i = new Intent();
        setResult(RESULT_OK, i);
        finish();
    }
}
