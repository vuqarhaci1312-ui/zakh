"use client";

const DECOY = ["8", "7", "6", "5", "4", "3", "5"] as const;

export type UxoralCounterColumn = {
  target: string;
  variant: "three" | "four";
  valueClass?: "normal" | "brand" | "white";
};

type UxoralCounterProps = {
  columns: UxoralCounterColumn[];
  label: React.ReactNode;
  labelClassName?: string;
  light?: boolean;
};

function buildStack(target: string) {
  return [target, ...DECOY];
}

function valueClassName(
  valueClass: UxoralCounterColumn["valueClass"],
  light?: boolean,
) {
  if (valueClass === "normal") return "counterValueColorNormal";
  if (valueClass === "brand") return "counterValueBrandColor";
  if (valueClass === "white" || light) return "counterValueIsWhite";
  return "";
}

export default function UxoralCounter({
  columns,
  label,
  labelClassName = "fontSizeSmLemongrass",
  light = false,
}: UxoralCounterProps) {
  return (
    <div className="satisficationPercentise">
      <div className="counterItem" data-ux-counter-item>
        <div className="counterText">
          {columns.map((column, index) => {
            const stack = buildStack(column.target);
            const extraClass = valueClassName(column.valueClass, light);

            return (
              <div
                key={`${column.target}-${index}`}
                className={light ? "counterCol counterColV2" : "counterCol"}
              >
                <div
                  className={`counterWrap ${column.variant}`}
                  data-ux-counter-wrap
                >
                  {stack.map((entry, entryIndex) => (
                    <div
                      key={`${entry}-${entryIndex}`}
                      className={["counterValue", extraClass].filter(Boolean).join(" ")}
                    >
                      {entry}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={labelClassName}>{label}</div>
    </div>
  );
}
