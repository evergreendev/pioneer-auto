import React from 'react'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import { Hour, type Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'hoursBlock' }>

const fetchCurrentHour = async () => {
  try {
    const payload = await getPayload({ config: configPromise })
    const hour = await payload.find({
      collection: 'hours',
      where: {
        and: [
          {
            hoursStart: {
              less_than_equal: new Date(),
            },
          },
          {
            hoursEnd: {
              greater_than_equal: new Date(),
            },
          },
          {
            isActive: {
              equals: true,
            },
          },
        ],
      },
    })
    return hour
  } catch (error) {
    console.error('Error fetching specific hour:', error)
    return null
  }
}

const fetchFutureHours = async (maxHours: number) => {
  try {
    const payload = await getPayload({ config: configPromise })
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const response = await payload.find({
      collection: 'hours',
      pagination: false,
      where: {
        and: [
          {
            hoursEnd: {
              greater_than_equal: today,
            },
          },
          {
            isActive: {
              equals: true,
            },
          },
        ],
      },
      sort: 'hoursStart',
      limit: maxHours,
    })

    return response.docs || []
  } catch (error) {
    console.error('Error fetching future hours:', error)
    return []
  }
}

const HoursBlockComponent = async (
  props: {
    id?: string
  } & Props,
) => {
  const { displayType, maxHoursToShow = 5 } = props

  let hours: Hour[] = []

  if (displayType === 'current') {
    const hour = await fetchCurrentHour()
    if (hour) hours = [hour.docs[0]]
  } else if (displayType === 'future') {
    hours = await fetchFutureHours(maxHoursToShow || 5)
  }

  return (
    <div>
      {hours.length > 0 ? (
        <div className="space-y-8 not-prose">
          {hours.map((hour) => (
            <div key={hour.id}>
              {displayType === "current" ? <h3 className="text-3xl font-bold font-display mb-2">Today&#39;s Hours</h3> : <h3 className="text-2xl font-display mb-2">{hour.label}</h3>}
              <div className="max-w-none">
                <RichText enableGutter={false} enableProse={false} content={hour.content} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg"></p>
      )}
    </div>
  )
}

export default HoursBlockComponent
