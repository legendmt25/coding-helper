package mk.ukim.finki.coding_helper.integration.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsernameWithTotalSolvedDto {
  private String username;
  private Long solved;
}
