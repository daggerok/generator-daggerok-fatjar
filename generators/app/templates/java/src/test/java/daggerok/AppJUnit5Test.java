package daggerok;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("JUnit 5 modern tests")
class AppJUnit5Test {

  @Test
  @DisplayName("Positive test")
  void testPositive() {
    assertThat(true, is(true));
  }

  @Test
  @DisplayName("Negative test")
  void testNegative() {

    assertThrows(AssertionError.class,
                 () -> assertThat(false, is(true)),
                 "Assertion error should thrown");
  }
}
