# Re: Submission: Topic Abstract Form - Group 2 CS-4102

- **From:** `Princess Marie Melo <princessmarie.melo@g.batstate-u.edu.ph>`
- **Date:** Wed, 23 Sep 2026 17:15:31 +0800
- **Retrieved:** 2026-09-24 23:05:26
- **Message-ID:** `<CAKrTKxPz5+LAHOEgVYjZy_HishB1TLm0=bOd=9MdupMfosFTmg@mail.gmail.com>`

---

## Attachments
_No attachments._

---

## Email Content

```text
Comments and Suggestions on the Revision

   1.

   Title
   -

      I prefer the suggested alternative title:
      A Cross-Modal Spatiotemporal Graph Framework for Detecting
      Dark-Vessel Candidates Using AIS Trajectories and SAR Imagery
      -

      This is more accurate because an unmatched SAR vessel does not
      automatically mean that the vessel intentionally turned off AIS.
      -

      Use “dark-vessel candidate” consistently throughout the study.
      2.

   Background of the Study
   -

      The research problem is much clearer now, especially the distinction
      between a genuine AIS-SAR discrepancy and mismatches caused by
transmission
      gaps, time differences, positional errors, congestion, and nearby vessels.
      -

      However, the background is still too long for a Topic Abstract.
      -

      Shorten the early discussion on global maritime activity, AIS
      background, SAR background, and general maritime monitoring.
      -

      Focus on:
      AIS limitations → SAR as independent observation → AIS-SAR
      correspondence problem → ambiguity/false positives → need for
      spatiotemporal graph modeling → proposed framework.
      3.

   Research Gap
   -

      The gap is now much more specific.
      -

      Your strongest gap is that existing work addresses AIS-SAR
      association and graph-based vessel modeling separately, while your study
      proposes using relational and spatiotemporal information specifically to
      determine whether an AIS-SAR mismatch remains unexplained.
      -

      Keep this as the main gap. Avoid adding additional unrelated gaps.
      4.

   Computer Science / Computational Contribution
   -

      The computational contribution is now clearer and appropriate for BS
      Computer Science.
      -

      The main contribution appears to be the heterogeneous spatiotemporal
      graph model with cross-modal graph attention and anchorage-aware
contextual
      information.
      -

      Keep this as the thesis contribution. AIS preprocessing, SAR
      detection, and the eventual POC should support the graph method,
not become
      separate major contributions.
      5.

   Graph Framework
   -

      The description of the nodes, edges, and features is much better now.
      -

      You already identify AIS and SAR nodes and include spatial distance,
      temporal offset, heading difference, speed consistency, and local traffic
      density.
      -

      In the Methodology, clearly explain how candidate edges are created
      before the GNN processes them. The graph should not already assume which
      AIS vessel belongs to which SAR detection.
      6.

   Ground Truth / Labeling
   -

      This is one of the most important issues to clarify next.
      -

      You propose three labels: Matched Vessel, Discrepancy Candidate, and
      Ambiguous Target.
      -

      Explain how you will establish the ground-truth match between AIS and
      SAR. Distance alone should not be used as ground truth because
that is also
      part of the problem you are trying to solve.
      -

      Clearly define the labeling procedure and how ambiguous cases will be
      validated.
      7.

   Anchorage-Aware Filter
   -

      The anchorage context is a good response to the earlier
      false-positive concern.
      -

      However, avoid saying that it can “differentiate legitimate loitering
      from anomalous non-transmitting vessels” as if anchorage location alone
      proves intent.
      -

      Better to state that it will reduce false-positive discrepancy
      indications associated with normal anchorage or berth-waiting behavior.
      8.

   Objectives
   -

      You currently have 3 main specific objectives, which is acceptable,
      although each contains several sub-objectives.
      -

      Keep the main objectives at 3–4 only. The detailed sub-steps can
      later be transferred to the Methodology.
      -

      I suggest adding a 4th objective for the POC, since this was included
      in my earlier comments:
      To develop a POC that visualizes SAR vessel detections, candidate AIS
      trajectory matches, association confidence, identified discrepancies, and
      the contextual factors contributing to the dark-vessel candidate
      classification.
      9.

   Evaluation
   -

      The proposed comparison with the Hungarian matching baseline,
      unimodal baselines, ablation testing, and synthetic AIS outages is good.
      -

      Since false-positive reduction is one of the main problems, make FPR
      a primary metric together with Precision, Recall, and F1-score.
      -

      Also separate association performance from discrepancy-classification
      performance because these are two different tasks.
      10.

   Data Feasibility


   -

   Before finalizing the Methodology, confirm the actual source and
   availability of the historical AIS records and Sentinel-1 SAR data for
   Batangas Bay, including whether there will be enough temporally overlapping
   observations.
   -

   The proposed 30-minute matching window should also have a clear
   technical basis rather than being an arbitrary value.
   -

   This is important because the whole study depends on having enough
   reliable AIS-SAR pairs for training and evaluation.


   11.

   Significance of the Study


   -

   The significance is generally aligned, but some claims are too strong.
   -

   For example, avoid saying the framework will help environmental agencies
   “stop illegal maritime activities.” The system only identifies observations
   that may require further verification.
   -

   Keep the significance focused on prioritizing AIS-SAR discrepancies for
   investigation and improving maritime monitoring support.


The revision has addressed most of my previous concerns, and I prefer the
alternative title using “Dark-Vessel Candidates.” The topic has a clear
BSCS computational contribution and may proceed to the Methodology and POC
development.

Before final endorsement, I would like the group to clarify the
ground-truth labeling procedure, the availability of actual AIS/SAR data,
the basis for the temporal matching window, and how the graph candidate
edges will be constructed.



On Wed, Sep 23, 2026 at 9:41 AM SANDARA BAJIO <23-04923@g.batstate-u.edu.ph>
wrote:

> Good morning Dr. Melo,
>
> We are submitting our revised Topic Abstract Form.
>
> For the *Background of the Study*, we focused the discussion of the main
> research problem:  the difficulty of reliably associating SAR-detected
> vessels with AIS trajectories and determining whether an apparent mismatch
> is caused by a genuine discrepancy or by factors such as AIS transmission
> gaps, spatial or temporal differences, vessel congestion, and nearby vessel
> ambiguity.
>
> We also added the *Objectives and the Significance of the Study*.
>
> For the title, we added a suggested alternative for your consideration:
>
> *Current revised title:*
> *A Cross-Modal Spatiotemporal Graph Framework for Dark-Vessel Detection
> Using AIS Trajectories and SAR Imagery*
>
> *Suggested alternative:*
> *A Cross-Modal Spatiotemporal Graph Framework for Detecting Dark-Vessel
> Candidates Using AIS Trajectories and SAR Imagery*
>
> [BAJIO, BRUAL, BUSTOS] TOPIC ABSTRACT FORM
> <https://docs.google.com/document/d/1xR6VWqTlyTA7455Uv2r784ClFLEc4UyVyRakqBn280c/edit?tab=t.0>
>
> We would appreciate your feedback on which title is more appropriate, as
> well as on the revised and added sections.
>
> Thank you very much.
>
> Group 2 - CS 4102
> BAJIO, Sandara B.
> BRUAL, Keirk Xandrex M.
> BUSTOS, Janison Giane A.
>
> On Fri, Sep 18, 2026 at 12:58 PM Princess Marie Melo <
> princessmarie.melo@g.batstate-u.edu.ph> wrote:
>
>> Comments and Suggestions
>>
>>    1.
>>
>>    Problem / Research Gap
>>    -
>>
>>       The problem is clear: AIS data may be incomplete or intentionally
>>       turned off, while SAR can detect vessels independently. The main challenge
>>       is deciding whether a SAR-detected vessel truly has no matching AIS record
>>       or whether the mismatch is only caused by transmission gaps, timing,
>>       congestion, or nearby vessels.
>>       -
>>
>>       Make this the main problem of the study and avoid making the
>>       background too broad.
>>       2.
>>
>>    Computer Science / Computational Contribution
>>    -
>>
>>       The topic is appropriate for BS Computer Science because it
>>       involves graph modeling, spatiotemporal data, multimodal data fusion,
>>       anomaly detection, and machine learning.
>>       -
>>
>>       Be very clear about what you are developing yourselves. Is the
>>       main contribution the graph model, the AIS-SAR matching algorithm,
>>       the anomaly detector, or the complete framework?
>>       -
>>
>>       The thesis should not become only an integration of existing AIS
>>       and SAR tools.
>>       3.
>>
>>    Alignment of the Problem and Proposed Solution
>>    -
>>
>>       Your three stated problems are about AIS-SAR matching,
>>       distinguishing real discrepancies from temporary gaps, and reducing false
>>       positives.
>>       -
>>
>>       Your proposed framework should therefore directly show how it will
>>       solve each of these.
>>       -
>>
>>       Make the flow clear:
>>       AIS trajectories + SAR detections → spatial/temporal matching →
>>       graph representation → discrepancy/anomaly analysis → dark-vessel candidate.
>>       4.
>>
>>    Dark-Vessel Detection
>>    -
>>
>>       Be careful with the term “dark vessel.” A vessel with no matching
>>       AIS record is not automatically intentionally hiding.
>>       -
>>
>>       I suggest using “dark-vessel candidate” or “AIS-SAR discrepancy”
>>       until the system has enough evidence to classify it. You already recognize
>>       this limitation in the background, so keep the terminology consistent.
>>       5.
>>
>>    Graph Framework
>>    -
>>
>>       Explain why a spatiotemporal graph is needed instead of a simpler
>>       AIS-SAR matching method.
>>       -
>>
>>       Specify what will become the nodes, edges, and features of the
>>       graph. For example: vessel positions, speed, course, time difference,
>>       distance, and relationships with nearby vessels.
>>       -
>>
>>       This is important because this will show the real computational
>>       depth of the study.
>>       6.
>>
>>    POC
>>    -
>>
>>       Your POC should clearly demonstrate the proposed computational
>>       framework.
>>       -
>>
>>       It may show the SAR-detected vessel, possible AIS matches,
>>       matching/confidence result, detected discrepancy, and reason why the vessel
>>       was flagged.
>>       -
>>
>>       The POC should support the thesis algorithm, not become the main
>>       contribution.
>>       7.
>>
>>    Objectives
>>    -
>>
>>       When you finalize the objectives, make sure each one directly
>>       matches the three problems you identified.
>>       -
>>
>>       Include measurable evaluation such as matching accuracy,
>>       precision, recall, F1-score, and false-positive rate, especially because
>>       reducing false positives is one of your stated problems.
>>
>>
>>
>> On Thu, Sep 17, 2026 at 10:07 PM SANDARA BAJIO <
>> 23-04923@g.batstate-u.edu.ph> wrote:
>>
>>> Good evening Dr. Melo,
>>>
>>> Please accept my apologies for sending this email at such a late hour.
>>>
>>> I have attached the Google Docs link draft of our group's topic abstract
>>> form for your review. Please let us know if there are any revisions or
>>> feedback you would like us to address.
>>>
>>> [BAJIO, BRUAL, BUSTOS] TOPIC ABSTRACT FORM
>>> <https://docs.google.com/document/d/1xR6VWqTlyTA7455Uv2r784ClFLEc4UyVyRakqBn280c/edit?usp=sharing>
>>>
>>> Thank you very much.
>>>
>>> Group 2 - CS 4102
>>> BAJIO, Sandara B.
>>> BRUAL, Keirk Xandrex M.
>>> BUSTOS, Janison Giane A.
>>>
>>>
>>
>> --
>>
>> *PRINCESS MARIE B. MELO, DIT*
>> Dean, College of Informatics and Computing Sciences
>> *Batangas State University – The National Engineering University*
>> Alangilan Campus | Batangas City, Philippines
>>
>> ✉ princessmarie.melo@g.batstate-u.edu.ph
>> ☎ (043) 425-0139 loc. 2223
>> 🌐 www.batstate-u.edu.ph
>>
>

-- 

*PRINCESS MARIE B. MELO, DIT*
Dean, College of Informatics and Computing Sciences
*Batangas State University – The National Engineering University*
Alangilan Campus | Batangas City, Philippines

✉ princessmarie.melo@g.batstate-u.edu.ph
☎ (043) 425-0139 loc. 2223
🌐 www.batstate-u.edu.ph
```
