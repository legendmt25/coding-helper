package mk.ukim.finki.problem_solving.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.Gender;
import mk.ukim.finki.problem_solving.model.enums.Role;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@RequiredArgsConstructor
@Node
public class User implements UserDetails {
    @Id
    private String email;

    private String username;
    private String password;
    private String firstName;
    private String lastName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthday;

    private Gender gender;
    private Role role;

    @Relationship
    private List<Submission> submissions;

    public User(UserInput input) {
        this.email = input.getEmail();
        this.username = input.getUsername();
        this.password = input.getPassword();
        this.firstName = input.getFirstName();
        this.lastName = input.getLastName();
        this.birthday = input.getBirthday();
        this.gender = input.getGender();
        this.role = Role.USER;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

}
