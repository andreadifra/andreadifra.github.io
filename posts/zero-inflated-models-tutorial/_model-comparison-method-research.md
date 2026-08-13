# Model-comparison strategy for the Medicare tutorial

Research date: 2026-07-28

## Question

What is an appropriate comparison strategy when the count-mean formula is held
fixed and the candidate set contains:

- an ordinary Poisson GLM;
- an ordinary NB2 model;
- a ZIP model;
- an intercept-only ZINB;
- a small, theory-aware set of ZINBs with covariate-dependent zero formulas?

The tutorial has two aims that must remain distinct:

1. explain which change in specification improves the fitted distribution; and
2. retain an interpretable two-process model only if it is both substantively
   defensible and empirically adequate.

## Short answer

Use AIC as a **secondary, in-sample ranking measure for a small prespecified
candidate set**, and use BIC as a **parsimony sensitivity check**. Neither is a
hypothesis test, neither proves a distinct extra-zero population, and neither
checks model adequacy. In this example, a single AIC/BIC tournament would also
hide which change produced an improvement.

The main tutorial should instead use a short ladder of matched contrasts,
supported by simulated-residual checks:

1. Poisson versus NB2, with the same count formula and no zero component;
2. ZIP versus ZINB, with the same count and zero formulas;
3. NB2 versus intercept-only ZINB, with the same NB2 count process;
4. intercept-only versus a few substantively motivated, covariate-dependent
   ZINB zero formulas.

There is no need to test every pair of specifications. Most pairwise contrasts
would answer no new scientific question.

If the article later makes prediction a primary goal, add resampling in which
each model is refitted and evaluated with a proper score for the **whole
predictive distribution**, such as held-out log score (negative log predictive
density) or ranked probability score. RMSE alone assesses the response mean and
cannot determine whether probability is allocated well across zeros, moderate
counts, and the upper tail.

## What AIC and BIC contribute

AIC estimates relative expected information loss for fitted likelihood models;
it was designed for choosing an approximating model, not testing a null
hypothesis ([Akaike 1974](https://doi.org/10.1109/TAC.1974.1100705)). BIC uses a
larger, sample-size-dependent penalty and originates as a large-sample
approximation to Bayesian model choice ([Schwarz
1978](https://doi.org/10.1214/aos/1176344136)).

For this tutorial, AIC and BIC are comparable when every candidate:

- is fitted to the same response records;
- uses a full maximum likelihood, not a quasi-likelihood;
- includes the same treatment of constants in the log likelihood; and
- has a trustworthy optimum.

The current tutorial fits its Poisson baseline with `stats::glm()` and its NB2
and zero-inflated candidates with `glmmTMB`. A same-implementation comparison
could add a duplicate Poisson fit or explicitly verify the full log likelihood,
but the agreed tutorial presentation retains the existing `glm()` object to
avoid an implementation detour. This is a pragmatic teaching choice rather than
a general rule: information criteria from different packages may not be
comparable when packages drop different likelihood constants. `glmmTMB`
calculates log likelihoods consistently, supports AIC comparison across
conditional families and zero-inflated models, and excludes unconverged fits
from AIC comparison ([Brooks et al.
2017](https://journal.r-project.org/articles/RJ-2017-066/)).

That makes AIC/BIC legitimate descriptive tools here, but not automatic
best-practice selectors:

- AIC answers which candidate has the best estimated in-sample
  likelihood--complexity trade-off, not whether a component is "significant."
- BIC's stronger penalty can make a useful parsimony check, but it does not
  become more authoritative merely because it is stricter.
- The usual derivations are regular-model asymptotics. No-zero-inflation and
  Poisson limits sit on parameter-space boundaries, and finite mixtures can be
  singular there. Standard BIC's marginal-likelihood penalty is not generally
  valid for singular models ([Drton and Plummer
  2017](https://academic.oup.com/jrsssb/article/79/2/323/7041940)); recent work
  likewise shows that ordinary AIC can miss its target at boundaries and
  singularities ([Mitchell, Allman, and Rhodes
  2024](https://arxiv.org/abs/2211.04136)).

The practical consequence is modest: report AIC and BIC as relative,
approximate evidence among deliberately chosen specifications. Do not translate
small differences into a pass/fail decision, model probabilities, or proof of
a latent class. A large difference is useful evidence of a distributional
improvement, but its cause must be identified through a matched contrast.

## Likelihood-ratio tests: which are regular?

An ordinary likelihood-ratio test (LRT) with a chi-squared reference
distribution relies on the null parameter lying in the interior of the
parameter space. When the null lies on a boundary, the reference distribution
is nonstandard ([Self and Liang
1987](https://doi.org/10.1080/01621459.1987.10478472)). The `glmmTMB`
troubleshooting guide therefore warns that ordinary LRT p-values are
conservative when a zero-inflation or variance parameter is zero and says that
the familiar halving correction applies only in simple cases
([official `glmmTMB` troubleshooting
guide](https://glmmtmb.github.io/glmmTMB/articles/troubleshooting.html)).

### Poisson versus NB2

Poisson is obtained from NB2 when the extra-dispersion parameter reaches its
boundary (equivalently, when `glmmTMB`'s NB2 size parameter tends to infinity).
An ordinary one-degree-of-freedom chi-squared LRT is therefore not the correct
reference test. For a single one-sided dispersion parameter under regular
nuisance conditions, the asymptotic LRT is the familiar mixture of a point mass
at zero and a one-degree-of-freedom chi-squared distribution. A purpose-built
one-sided score test for overdispersion is another option ([Cameron and Trivedi
1990](https://doi.org/10.1016/0304-4076(90)90014-K)).

For the tutorial, a formal test adds little. The conditional overdispersion is
large, the likelihood criteria strongly separate the models, and simulated
residuals can show the practical failure. Explain the boundary issue if an LRT
is mentioned; do not add a p-value ladder.

### ZIP versus ZINB

With identical count and zero formulas, ZIP is the Poisson-dispersion boundary
of ZINB. It is therefore another one-sided dispersion problem, not a
strictly-nonnested comparison. A score test designed specifically for ZIP
against ZINB exists ([Ridout, Hinde, and Demétrio
2001](https://doi.org/10.1111/j.0006-341X.2001.00219.x)).

Again, this tutorial can make the point more directly through the matched
information-criterion contrast plus dispersion diagnostics: adding a zero
component does not repair an inadequate Poisson count component.

### NB2 versus intercept-only ZINB

The ordinary NB2 model is the no-extra-zero limit of ZINB. The zero probability
is then on a boundary; with a logit parameterization, the corresponding
intercept tends to negative infinity. Standard Wilks chi-squared theory does
not apply. The exact limiting mixture is not something the tutorial should
guess: it depends on the model structure, and becomes more complicated when
zero-component covariates are unidentified under the null.

If a formal test were essential, use a test derived for the exact NB2/ZINB
setting or a carefully implemented parametric-bootstrap LRT under the fitted
NB2 null. Parametric bootstrapping is a standard way to calibrate likelihood
ratios in nonregular mixture problems ([Feng and McCulloch
1996](https://doi.org/10.1111/j.2517-6161.1996.tb02104.x)). For this explanatory
tutorial, the safer and clearer choice is to show the small AIC improvement,
the BIC reversal, the fitted extra-zero probability, and targeted simulation
diagnostics. That supports the limited conclusion that a **constant**
extra-zero mass adds little beyond NB2; it does not force a binary declaration
that zero inflation is absent.

### Intercept-only versus covariate-dependent ZINB

These models share the NB2 count process. When the intercept-only ZINB has a
finite, identifiable zero probability, setting the added zero-component slopes
to zero is an ordinary interior restriction. A standard nested LRT with degrees
of freedom equal to the number of added slopes is then valid, subject to
convergence, identification, and the usual large-sample conditions.

An LRT is reasonable only for a prespecified nested block. It does not compare
non-nested alternative zero formulas, and data-driven selection makes later
coefficient p-values conditional on that selection. The article's small
theory-aware AIC/BIC comparison is more aligned with its explanatory purpose;
an LRT need not be added unless the reader question is explicitly whether one
prespecified predictor block improves the zero formula.

## Why not use the Vuong test?

Vuong's original method compares the Kullback--Leibler closeness of genuinely
nonnested or overlapping models under explicit regularity conditions ([Vuong
1989](https://doi.org/10.2307/1912557)). The familiar standard-normal Vuong
test should not be used to compare an ordinary count model with its
zero-inflated extension. The ordinary model is reached at the no-inflation
boundary, where the required regularity and normal approximation fail. Wilson
demonstrates this failure directly and identifies use of the normal Vuong test
as a test for zero inflation as erroneous ([Wilson
2015](https://doi.org/10.1016/j.econlet.2014.12.029)).

Nor does Vuong solve the tutorial's confounding problem:

- NB2 versus ZINB is a boundary/limit comparison, not a clean strictly
  nonnested comparison.
- ZIP versus ZINB is nested through the dispersion boundary.
- ZIP versus ordinary NB2 changes both the count family and the zero component
  and overlaps at Poisson; it does not isolate evidence for zero inflation.

The tutorial should omit Vuong tests.

## Model adequacy is a separate question

Information criteria and LRTs compare candidates. They cannot establish that
the best-ranked candidate reproduces the data.

DHARMa's simulation diagnostics address this second question. Its
zero-frequency test compares the observed number of zeros with the distribution
of zero counts simulated from a fitted model. The documentation explicitly
warns that this is a residual pattern, not a decision rule for fitting ZIP:
negative-binomial dispersion and other misspecification can create or remove a
zero discrepancy ([DHARMa reference
manual](https://stat.ethz.ch/CRAN/web/packages/DHARMa/refman/DHARMa.html)).
Uniformity, dispersion, covariate-pattern, and observed-versus-predicted
frequency checks should accompany the zero check.

These diagnostics should be applied to the leading NB2 and ZINB
specifications, not only to the eventual working model. The appropriate
conclusion may be a trade-off: one candidate can reproduce zero frequency
better while another reproduces residual spread better. Convergence and a
positive-definite Hessian must be checked before either comparison or
diagnosis; the official [`glmmTMB::diagnose()`
documentation](https://glmmtmb.github.io/glmmTMB/reference/diagnose.html)
describes the relevant coefficient, scaling, and Hessian checks.

## What out-of-sample assessment would add

Cross-validation changes the question from relative in-sample support to
performance on unseen records. When maximum-likelihood models are judged by
held-out log predictive density, this is closely related to AIC's predictive
target ([Stone
1977](https://doi.org/10.1111/j.2517-6161.1977.tb01603.x)), while reducing
dependence on AIC's analytic penalty approximation.

The score must evaluate the predictive **distribution**:

- negative log predictive density rewards probability assigned to the count
  that actually occurs and is especially sensitive to confident tail errors;
- ranked probability score compares the full predictive cumulative
  distribution and is usually less dominated by a single very unlikely count;
- RMSE evaluates only the predictive mean and should be reported, if at all,
  alongside a distribution-sensitive score.

Log score and ranked probability scores are proper: in expectation, they reward
forecasting the true distribution rather than gaming the metric ([Gneiting and
Raftery 2007](https://doi.org/10.1198/016214506000001437)). Czado, Gneiting, and
Held give count-specific guidance on predictive mass functions, log score,
ranked probability score, calibration, and nonrandomized probability integral
transforms ([2009](https://doi.org/10.1111/j.1541-0420.2009.01191.x)).

Cross-validation still would not prove that the ZINB latent state corresponds
to a real structural-zero group. It would show only that this specification
predicts new count distributions better. It also must repeat any
formula-selection step within each training fold to assess the whole workflow
honestly.

For the present tutorial, implementing repeated cross-validation would add
substantial code and distract from the core two-process interpretation. It is
best described as the recommended next step for a prediction-focused analysis,
with log predictive density or ranked probability score named explicitly.

## Recommended presentation in this article

1. Keep the three reader decisions at the start of Section 5, but do not
   foreground an inventory that resembles an exhaustive model tournament.
2. Introduce models only when their matched contrast is needed.
3. Use one compact comparison display organized into the four contrasts above.
   Report delta AIC, with BIC as a parsimony sensitivity check; avoid universal
   cutoffs and winner language.
4. Do not report ordinary chi-squared LRTs for Poisson/NB2,
   ZIP/ZINB, or NB2/intercept-only ZINB. A short note can explain that their
   nulls lie on boundaries. Do not use Vuong tests.
5. If a formal nested test is desired, reserve it for one prespecified
   intercept-only versus covariate-dependent ZINB block. It is optional and
   should not drive formula search.
6. Show estimation stability before ranking candidates.
7. Diagnose both the leading NB2 and working ZINB with simulation checks. State
   clearly that relative fit and adequacy are different questions.
8. Explain why RMSE may disagree with likelihood criteria. Mention
   cross-validated log predictive density or ranked probability score as the
   appropriate distribution-sensitive extension, without implementing a full
   prediction workflow in this tutorial.

This strategy preserves the article's scope. It teaches readers to make
specific, defensible comparisons without implying that every fitted
specification must be tested against every other specification or that one
statistic can establish the data-generating mechanism.
