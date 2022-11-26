package mk.ukim.finki.problem_solving.model.object;

import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.Gender;
import mk.ukim.finki.problem_solving.model.enums.Role;
import mk.ukim.finki.problem_solving.model.input.UserInput;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@NoArgsConstructor
@Node
public class User implements UserDetails {
  @Id
  private String email;

  private String username;
  private String password;
  private String firstName;
  private String lastName;
  private String avatarImage;

  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date birthday;

  private Gender gender;
  private Role role;

  @Relationship(value = "SUBMISSION", direction = Relationship.Direction.OUTGOING)
  private List<Submission> submissions;
  @Relationship(value = "LIKES")
  private List<Problem> likedProblems;
  @Relationship(value = "FAVORITE")
  private List<Problem> favorites;

  public User(UserInput input) {
    this.email = input.getEmail();
    this.username = input.getUsername();
    this.password = input.getPassword();
    this.firstName = input.getFirstName();
    this.lastName = input.getLastName();
    this.birthday = input.getBirthday();
    this.gender = input.getGender();
    this.role = Role.USER;
    this.avatarImage = "defaultUser.png";

    this.submissions = new ArrayList<>();
    this.likedProblems = new ArrayList<>();
    this.favorites = new ArrayList<>();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singletonList(this.role);
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return this.getEmail();
  }

  public String getUserName() {
    return this.username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}
