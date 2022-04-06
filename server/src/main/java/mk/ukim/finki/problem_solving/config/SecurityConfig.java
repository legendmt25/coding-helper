package mk.ukim.finki.problem_solving.config;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.service.AuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final AuthService userDetailsService;
    private final JwtTokenFilter jwtTokenFilter;
    private final PasswordEncoder passwordEncoder;
    private final CorsConfigurationSource corsConfigurationSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .cors().configurationSource(corsConfigurationSource).and()
                .authorizeRequests()
                .antMatchers("/authenticate", "/register", "/", "/api/**", "/public/**").permitAll()
                .anyRequest().authenticated().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().exceptionHandling()
                .authenticationEntryPoint(((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage()))).and()

                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }



    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }
}
