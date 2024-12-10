"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const chartData = [
    { date: "2024-10-01", mobile: 220 },
    { date: "2024-10-02", mobile: 310 },
    { date: "2024-10-03", mobile: 190 },
    { date: "2024-10-04", mobile: 420 },
    { date: "2024-10-06", mobile: 520 },
    { date: "2024-10-07", mobile: 300 },
    { date: "2024-10-08", mobile: 210 },
    { date: "2024-10-09", mobile: 180 },
    { date: "2024-10-10", mobile: 330 },
    { date: "2024-10-11", mobile: 270 },
    { date: "2024-10-12", mobile: 240 },
    { date: "2024-10-13", mobile: 160 },
    { date: "2024-10-14", mobile: 490 },
    { date: "2024-10-15", mobile: 380 },
    { date: "2024-10-16", mobile: 400 },
    { date: "2024-10-17", mobile: 420 },
    { date: "2024-10-18", mobile: 350 },
    { date: "2024-10-19", mobile: 180 },
    { date: "2024-10-20", mobile: 230 },
    { date: "2024-10-21", mobile: 140 },
    { date: "2024-10-22", mobile: 120 },
    { date: "2024-10-23", mobile: 290 },
    { date: "2024-10-24", mobile: 220 },
    { date: "2024-10-25", mobile: 250 },
    { date: "2024-10-26", mobile: 170 },
    { date: "2024-10-27", mobile: 460 },
    { date: "2024-10-28", mobile: 190 },
    { date: "2024-10-29", mobile: 130 },
    { date: "2024-10-30", mobile: 280 },
    { date: "2024-10-31", mobile: 230 },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Bus 08:00",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Bus 09:00",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function FooterDashboard() {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-12-10")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Area Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing total visitors for the last 3 months
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="mobile"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke="var(--color-mobile)"
                            stackId="a"
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="url(#fillDesktop)"
                            stroke="var(--color-desktop)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
