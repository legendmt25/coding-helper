package mk.ukim.finki.problem_solving.model;

import lombok.Data;
import mk.ukim.finki.problem_solving.model.enums.Gender;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class UserInput {
    String email;
    String username;
    String password;
    String firstName;
    String lastName;
    Gender gender;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    Date birthday;

    public UserInput(String email,
                     String username,
                     String password,
                     String firstName,
                     String lastName,
                     Date birthday,
                     Gender gender) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.gender = gender;
    }

}
