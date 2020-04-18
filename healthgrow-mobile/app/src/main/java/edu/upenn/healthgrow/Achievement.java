package edu.upenn.healthgrow;

public class Achievement {
    protected String model;
    protected String operator;
    protected String field;

    public Achievement(String model, String operator, String field) {
        this.model = model;
        this.operator = operator;
        this.field = field;
    }
}
