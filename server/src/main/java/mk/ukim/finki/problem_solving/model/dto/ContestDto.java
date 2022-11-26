package mk.ukim.finki.problem_solving.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.ContestStatus;
import mk.ukim.finki.problem_solving.model.object.Contest;
import mk.ukim.finki.problem_solving.model.object.ContestProblem;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContestDto {
  private Long id;
  private String name;
  private String duration;
  private Date startsOn;
  private ContestStatus status;

  List<ContestProblem> problems;

  public ContestDto(Contest contest) {
    this.id = contest.getId();
    this.name = contest.getName();
    this.duration = contest.getDuration();
    this.startsOn = contest.getStartsOn();
    this.status = contest.getStatus();
    this.problems = contest.getProblems();
  }
}
