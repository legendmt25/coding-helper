package mk.ukim.finki.problem_solving.model;

import lombok.*;
import mk.ukim.finki.problem_solving.model.enums.Gender;
import mk.ukim.finki.problem_solving.model.enums.Role;
import org.hibernate.Hibernate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "users")
public class User implements UserDetails {
    @Id
    private String email;

    private String username;
    private String password;
    private String firstName;
    private String lastName;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date birthday;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Enumerated(EnumType.STRING)
    private Role role;

    public User(UserInput input) {
        this.email = input.email;
        this.username = input.username;
        this.password = input.password;
        this.firstName = input.firstName;
        this.lastName = input.lastName;
        this.birthday = input.birthday;
        this.gender = input.gender;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return email != null && Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
