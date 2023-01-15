package mk.ukim.finki.coding_helper.rest.controller;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import mk.ukim.finki.coding_helper.core.service.SubmissionService;
import mk.ukim.finki.coding_helper.integration.dto.SubmissionDto;
import mk.ukim.finki.coding_helper.rest.api.SubmissionsApi;
import mk.ukim.finki.coding_helper.rest.api.SubmitApi;
import mk.ukim.finki.coding_helper.rest.mappers.SubmissionMapper;
import mk.ukim.finki.coding_helper.rest.model.GetSubmissionsRequest;
import mk.ukim.finki.coding_helper.rest.model.SubmissionEntry;
import mk.ukim.finki.coding_helper.rest.model.SubmissionReqBody;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.List;
import java.util.Optional;

@CodingHelperController
@RequiredArgsConstructor
public class SubmissionController implements SubmissionsApi, SubmitApi {
  private final SubmissionService submissionService;
  private final SubmissionMapper submissionConverter;

  @Override
  public Optional<NativeWebRequest> getRequest() {
    return SubmissionsApi.super.getRequest();
  }

  @Override
  @SneakyThrows
  public ResponseEntity<String> createSubmissionsEntry(SubmissionReqBody body) {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    String output = submissionService.create(email, body.getProblemId(), body.getCode(), body.getLanguage());
    return ResponseEntity.ok(output);
  }

  @Override
  public ResponseEntity<List<SubmissionEntry>> getSubmissions(GetSubmissionsRequest body) {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    List<SubmissionDto> entries;
    if (body.getProblemId() == null) {
      entries = submissionService.findAllSubmissionsByEmail(email);
    } else {
      entries = submissionService.findAllSubmissionsByUserEmailAndProblemId(email, body.getProblemId());
    }
    List<SubmissionEntry> convertedEntries = submissionConverter.convertListOfSubmissionModel(entries);
    return ResponseEntity.ok(convertedEntries);
  }
}
