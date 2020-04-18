package edu.upenn.healthgrow;

import android.os.AsyncTask;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class GetAllLog extends AsyncTask<URL, String, ArrayList<String>> {

    private String email;
    private URL url;
    private String jsonInputString;
    private String res;
    private JSONArray array;

    public GetAllLog(String email) {
        this.email = email;
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    protected ArrayList<String> doInBackground(URL... urls) {

        try {
            ArrayList<String> finalList = new ArrayList<>();
            //workout
            url = urls[0];
            Log.d("url", String.valueOf(url));
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);

            jsonInputString = "{\"email\": \"" + email + "\"}";
            Log.d("hi", jsonInputString);
            try(OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            } catch (Exception e) {
                Log.d("complete", e.toString());
            }

            try(BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                try {
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine + "\n");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    try {
                        conn.getInputStream().close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                res = response.toString();
                Log.d("res", res);
            }

            array = new JSONArray(res);
            for (int i = 0; i < array.length(); i++) {
                Log.d("hi", "hello");
                JSONObject row = array.getJSONObject(i);
                Log.d("row", String.valueOf(row));
                String workout = row.getString("workouts");
                Log.d("workout", workout);
                int reps = row.getInt("reps");
                int weight = row.getInt("weight");
                String print = workout + " for " + reps + " reps with weight " + weight;
                Log.d("print", print);
                finalList.add(print);
            }

            res = "";
            conn.disconnect();

            //meal
            url = urls[1];
            Log.d("url", String.valueOf(url));
            conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);

            jsonInputString = "{\"email\": \"" + email + "\"}";
            Log.d("hi", jsonInputString);
            try(OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            } catch (Exception e) {
                Log.d("complete", e.toString());
            }

            try(BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                try {
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine + "\n");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    try {
                        conn.getInputStream().close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                res = response.toString();
                Log.d("res", res);
            }

            array = new JSONArray(res);
            for (int i = 0; i < array.length(); i++) {
                JSONObject row = array.getJSONObject(i);
                Log.d("row", String.valueOf(row));
                String type = row.getString("type");
                String mealStr = row.getString("mealStr");
                String print = "You ate " + mealStr + " for " + type;
                Log.d("print", print);
                finalList.add(print);
            }

            res = "";
            conn.disconnect();

            //mood
            url = urls[2];
            Log.d("url", String.valueOf(url));
            conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);

            jsonInputString = "{\"email\": \"" + email + "\"}";
            Log.d("hi", jsonInputString);
            try(OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            } catch (Exception e) {
                Log.d("complete", e.toString());
            }

            try(BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                try {
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine + "\n");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    try {
                        conn.getInputStream().close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                res = response.toString();
                Log.d("res", res);
            }

            array = new JSONArray(res);
            for (int i = 0; i < array.length(); i++) {
                JSONObject row = array.getJSONObject(i);
                Log.d("row", String.valueOf(row));
                int rating = row.getInt("rating");
                String print = "You had a mood of " + rating;
                Log.d("print", print);
                finalList.add(print);
            }

            res = "";
            conn.disconnect();

            //journal
            url = urls[3];
            Log.d("url", String.valueOf(url));
            conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);

            jsonInputString = "{\"email\": \"" + email + "\"}";
            Log.d("hi", jsonInputString);
            try(OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            } catch (Exception e) {
                Log.d("complete", e.toString());
            }

            try(BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                try {
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine + "\n");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    try {
                        conn.getInputStream().close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                res = response.toString();
                Log.d("res", res);
            }

            array = new JSONArray(res);
            for (int i = 0; i < array.length(); i++) {
                JSONObject row = array.getJSONObject(i);
                Log.d("row", String.valueOf(row));
                String title = row.getString("title");
                String print = "You wrote a journal called \"" + title + "\"";
                Log.d("print", print);
                finalList.add(print);
            }

            res = "";
            conn.disconnect();


            return finalList;



        } catch (Exception e) {
            return null;
        }
    }

}
