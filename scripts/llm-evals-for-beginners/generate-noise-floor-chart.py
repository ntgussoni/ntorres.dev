#!/usr/bin/env python3
"""Generate noise-floor variance chart from numbers in the LLM evals post."""

import statistics
from pathlib import Path

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "posts/llm-evals-for-beginners/noise-floor-variance.png"

# Five repeated eval runs from the post
version_a = [70, 75, 65, 70, 70]
version_b = [80, 65, 85, 70, 80]

mean_a = statistics.mean(version_a)
mean_b = statistics.mean(version_b)
std_a = statistics.stdev(version_a)
std_b = statistics.stdev(version_b)
gap = mean_b - mean_a

# Post uses ~8% as illustrative noise floor; pooled stdev of both series
pooled_std = statistics.stdev(version_a + version_b)

plt.rcParams.update({
    "font.family": "sans-serif",
    "font.sans-serif": ["Inter", "Helvetica Neue", "Arial", "DejaVu Sans"],
    "axes.spines.top": False,
    "axes.spines.right": False,
})

fig, ax = plt.subplots(figsize=(10, 6), dpi=150)
fig.patch.set_facecolor("#ffffff")
ax.set_facecolor("#ffffff")

x_a, x_b = 1, 2
jitter = 0.06

for i, score in enumerate(version_a):
    ax.scatter(x_a + np.random.default_rng(i).uniform(-jitter, jitter), score,
               s=90, color="#fdba74", edgecolors="#ea580c", linewidths=1.5, zorder=3)

for i, score in enumerate(version_b):
    ax.scatter(x_b + np.random.default_rng(i + 10).uniform(-jitter, jitter), score,
               s=90, color="#fed7aa", edgecolors="#f97316", linewidths=1.5, zorder=3)

ax.errorbar(x_a, mean_a, yerr=std_a, fmt="o", color="#c2410c", capsize=10, capthick=2,
            markersize=10, linewidth=2.5, label=f"Version A mean {mean_a:.0f}%")
ax.errorbar(x_b, mean_b, yerr=std_b, fmt="o", color="#ea580c", capsize=10, capthick=2,
            markersize=10, linewidth=2.5, label=f"Version B mean {mean_b:.0f}%")

# Noise floor band (2x pooled std around midpoint)
mid = (mean_a + mean_b) / 2
noise_band = 2 * pooled_std
ax.axhspan(mid - noise_band, mid + noise_band, color="#fff7ed", alpha=0.9, zorder=0)
ax.axhline(mid, color="#fdba74", linestyle="--", linewidth=1.2, alpha=0.8)

ax.annotate(
    f"Gap between averages:\n{gap:.0f} points",
    xy=((x_a + x_b) / 2, (mean_a + mean_b) / 2),
    xytext=(2.55, 58),
    fontsize=11,
    color="#9a3412",
    arrowprops=dict(arrowstyle="->", color="#f97316", lw=1.5),
)

ax.text(2.55, mid + noise_band + 1.5, "Typical re-run swing (±1 std)", fontsize=10, color="#a3a3a3", ha="left")
ax.text(
    2.55,
    mid - noise_band - 3,
    f"Need ~{2 * pooled_std:.0f}pt gap to call a winner (2× swing)",
    fontsize=10,
    color="#a3a3a3",
    ha="left",
)

ax.set_xticks([x_a, x_b])
ax.set_xticklabels(["Version A", "Version B"], fontsize=12, fontweight="600")
ax.set_ylabel("% of cases passed", fontsize=12)
ax.set_title(
    "Five re-runs of the same eval: a 6-point average gap can still be noise",
    fontsize=15,
    fontweight="700",
    pad=16,
)
ax.set_ylim(55, 92)
ax.set_xlim(0.4, 2.8)
ax.grid(axis="y", color="#f5f5f5", linewidth=1)

legend_handles = [
    mpatches.Patch(facecolor="#fdba74", edgecolor="#ea580c", label="One full eval run"),
    mpatches.Patch(facecolor="#fff7ed", edgecolor="#fdba74", label="Typical swing band"),
]
ax.legend(handles=legend_handles, loc="upper left", frameon=False, fontsize=10)

plt.tight_layout()
plt.savefig(OUT, bbox_inches="tight", facecolor="#ffffff")
print(f"Wrote {OUT}")
